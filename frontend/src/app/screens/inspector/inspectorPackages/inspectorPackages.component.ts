import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../../services/package.service';
import { ShipmentVehicleService } from '../../../services/shipmentVehicle.service';
import { PackageBarcode } from '../../../org.bitship';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ShipmentVehicleReportService } from '../../../services/shipmentVehicleReport.service';
import { WarehouseReportService } from '../../../services/warehouseReport.service';


@Component({
    selector: 'app-viewPackages',
    templateUrl: './inspectorPackages.component.html',
    styleUrls: ['./inspectorPackages.component.css'],
    providers: [PackageService, ShipmentVehicleService, ShipmentVehicleReportService, WarehouseReportService]
})
export class InspectorPackagesComponent implements OnInit {
    private packagesBarcode;
    private errorMessage;
    private packages;
    private shipmentVehicleReport;
    private wareHouseReport;
    private scanedPackages = [];
    private show: boolean = false;
    private buttonScanName: any = 'Scan package barcode';


    myForm: FormGroup;
    vehicleId = new FormControl('', Validators.required);

    constructor(private packageService: PackageService, private shipmentVehicleService: ShipmentVehicleService,
        private warehouseReportService: WarehouseReportService, fb: FormBuilder,
        private shipmentVehicleReportService: ShipmentVehicleReportService) {
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

    sendShipmentReport(): Promise<any> {
        this.shipmentVehicleReport = {
            '$class': 'org.bitship.ShipmentVehicleReport',
            'inspector': 'duyinspector1',
            'ShipmentVehicle': this.vehicleId.value.trim(),
            'packages': this.scanedPackages,
            'status': 'OK',
            'note': 'string'
        }
        return this.shipmentVehicleReportService
            .postTransaction(this.shipmentVehicleReport)
            .toPromise()
            .then((result) => {
                this.scanedPackages = [];
            });
    }

    sendWarehouseReport(): Promise<any> {
        this.wareHouseReport = {
            '$class': 'org.bitship.WarehouseReport',
            'inspector': 'duyinspector1',
            'packages': this.scanedPackages,
            'warehouse': 'warhouse1',
            'shipmentVehicle': this.scanedPackages,
            'note': 'string'
        }

        return this.warehouseReportService
            .postTransaction(this.wareHouseReport)
            .toPromise()
            .then((result) => {
                this.scanedPackages = [];
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
