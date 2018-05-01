import { Component, OnInit, OnDestroy } from '@angular/core';
import { PackageService } from '../../../services/package.service';
import { Router } from '@angular/router';
import { ShipmentVehicleService } from '../../../services/shipmentVehicle.service';
import { PackageBarcode } from '../../../org.bitship';
import { ShipmentTransferService } from '../../../services/shipmentTransfer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-showPackages',
    templateUrl: './vehiclePackages.component.html',
    styleUrls: ['./vehiclePackages.component.css'],
    providers: [PackageService, ShipmentVehicleService, ShipmentTransferService]
})
export class VehiclePackagesComponent implements OnInit, OnDestroy {
    private packagesBarcode;
    private errorMessage;
    private packages;
    private shipmentTransfer;
    private scannedPackages: Array<string> = [];
    private show = false;
    private buttonScanName: any = 'Scan package barcode';
    private stringScannedPackages: string;
    private vehicleId: string;
    private sub: any

    constructor(
        private route: ActivatedRoute,
        private packageService: PackageService,
        private shipmentVehicleService: ShipmentVehicleService,
        private shipmentTransferService: ShipmentTransferService,
    ) {
    }

    async ngOnInit() {
        this.sub = await this.route.params.subscribe((params) => {
            this.vehicleId = params.vehicleId
            this.loadPackagesOfShipmentVehicle();
        })
    }

    loadPackagesOfShipmentVehicle(): Promise<any> {
        const barcodes: Array<PackageBarcode> = [];

        return this.shipmentVehicleService.getShipmentVehicle(this.vehicleId)
            .toPromise()
            .then((result) => {
                let tempList = [];
                tempList = result.packages;
                tempList.forEach(resourcePackage => {
                    const packageId: PackageBarcode = new PackageBarcode();
                    packageId.barcode = resourcePackage.split('#')[1];
                    barcodes.push(packageId);
                });
                console.log('barcodes: ', barcodes)
                return this.packageService.getPackagesByArrays(barcodes).toPromise();
            })
            .then((result) => {
                const temp = [];
                result.forEach(asset => {
                    console.log(asset);
                    temp.push(asset);
                });
                this.packages = temp;
            })
            .catch((error) => {
            });
    }

    submitShipmentTransfer(): Promise<any> {
        this.shipmentTransfer = {
            "$class": "org.bitship.ShipmentTransfer",
            "vehicle": this.vehicleId,
            "packages": this.scannedPackages,
            "status": "IN_VEHICLE"
        }

        return this.shipmentTransferService
            .postShipmentTransaction(this.shipmentTransfer)
            .toPromise()
            .then((result) => {
                this.loadPackagesOfShipmentVehicle();
                this.scannedPackages = [];
            })
            .catch ((error) => {
                console.error(error);
            });
    }

    onScannedPackages(barcodes: Array<string>) {
        this.scannedPackages.splice(0, this.scannedPackages.length);
        this.scannedPackages = this.scannedPackages.concat(barcodes);
        this.toggle();
        this.renderStringScannedPackagesId();
    }
    renderStringScannedPackagesId() {
        this.stringScannedPackages = 'Scanned Packages: ';
        for (const packageId of this.scannedPackages) {
            this.stringScannedPackages +=  packageId + '---';
        }
    }

    toggle() {
        this.show = !this.show;
        if (this.show) {
            this.buttonScanName = 'Not Scan';
        } else {
            this.buttonScanName = 'Scan package barcode';
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}




