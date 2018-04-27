import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../../services/package.service';
import { Router } from '@angular/router';
import { ShipmentVehicleService } from '../../../services/shipmentVehicle.service';
import { PackageBarcode } from '../../../org.bitship';
import { ShipmentTransferService } from '../../../services/shipmentTransfer.service';

@Component({
    selector: 'app-showPackages',
    templateUrl: './vehiclePackages.component.html',
    styleUrls: ['./vehiclePackages.component.css'],
    providers: [PackageService, ShipmentVehicleService, ShipmentTransferService]
})
export class VehiclePackagesComponent implements OnInit {
    private packagesBarcode;
    private errorMessage;
    private packages;
    private shipmentTransfer;
    private scanedPackages: Array<string> = [];
    private show: boolean = false;
    private buttonScanName: any = 'Scan package barcode';

    constructor(private packageService: PackageService, private shipmentVehicleService: ShipmentVehicleService,
        private shipmentTransferService: ShipmentTransferService) {
    }

    ngOnInit() {
        this.loadPackagesOfShipmentVehicle();
    }

    loadPackagesOfShipmentVehicle(): Promise<any> {
        let barcodes: Array<PackageBarcode> = [];

        return this.shipmentVehicleService.getShipmentVehicle('toyotaTruck')
            .toPromise()
            .then((result) => {
                let tempList = [];
                tempList = result.packages;
                tempList.forEach(resourcePackage => {
                    const packageId: PackageBarcode = new PackageBarcode();
                    packageId.barcode = resourcePackage.split('#')[1];
                    barcodes.push(packageId);
                });
                return this.packageService.getPackagesByArrays(barcodes).toPromise();
            })
            .then((result) => {
                let temp = [];
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
            "vehicle": 'toyotaTruck',
            "packages": this.scanedPackages,
            "status": "IN_VEHICLE"
        }

        return this.shipmentTransferService
            .postShipmentTransaction(this.shipmentTransfer)
            .toPromise()
            .then((result) => {
                this.loadPackagesOfShipmentVehicle();
                this.scanedPackages = [];
            })
            .catch ((error) => {
                console.error(error);
            });
    }

    onScannedPackages(barcodes: Array<string>) {
        this.scanedPackages.splice(0, this.scanedPackages.length);
        this.scanedPackages = this.scanedPackages.concat(barcodes);
    }

    toggle() {
        this.show = !this.show;
        if (this.show) {
            this.buttonScanName = 'Not Scan';
        } else {
            this.buttonScanName = 'Scan package barcode';
        }
    }
}




