import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../../services/package.service';
import { Router } from '@angular/router';
import { ShipmentVehicleService } from '../../../services/shipmentVehicle.service';
import { PackageBarcode } from '../../../org.bitship';

@Component({
    selector: 'app-showPackages',
    templateUrl: './vehiclePackages.component.html',
    styleUrls: ['./vehiclePackages.component.css'],
    providers: [PackageService, ShipmentVehicleService]
})
export class VehiclePackagesComponent implements OnInit {
    private packagesBarcode;
    private errorMessage;
    private packages;

    constructor(private packageService: PackageService, private shipmentVehicleService: ShipmentVehicleService, private router: Router) {
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
}




