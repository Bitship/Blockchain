import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../../services/package.service';
import { ShipmentVehicleService } from '../../../services/shipmentVehicle.service';
import { PackageBarcode } from '../../../org.bitship';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
    selector: 'app-viewPackages',
    templateUrl: './inspectorPackages.component.html',
    styleUrls: ['./inspectorPackages.component.css'],
    providers: [PackageService, ShipmentVehicleService]
})
export class InspectorPackagesComponent implements OnInit {
    private packagesBarcode;
    private errorMessage;
    private packages;
    myForm: FormGroup;
    vehicleId = new FormControl("", Validators.required);

    constructor(private packageService: PackageService, private shipmentVehicleService: ShipmentVehicleService, fb: FormBuilder) {
        this.myForm = fb.group({
           vehicleId: this.vehicleId
        });
    }
    ngOnInit() {
    }
    loadPackagesFromVehicle(): Promise<any> {
        let barcodes: Array<PackageBarcode> = [];
        return this.shipmentVehicleService.getShipmentVehicle(this.vehicleId.value.trim())
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

    searchVehicleId() {
        this.loadPackagesFromVehicle();
    }
}
