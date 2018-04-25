import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../../services/package.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-showPackages',
    templateUrl: './vehiclePackages.component.html',
    styleUrls: ['./vehiclePackages.component.css'],
    providers: [PackageService]
})
export class VehiclePackagesComponent implements OnInit {
    private packages;
    private errorMessage;

    constructor(private packageService: PackageService, private router: Router) {
    }

    ngOnInit() {
        this.loadAll();
    }

    loadAll(): Promise<any> {
        let tempList = [];
        return this.packageService.getAssetsWithStatus('PENDING')
            .toPromise()
            .then((result) => {
                this.errorMessage = null;
                result.forEach(asset => {
                    tempList.push(asset);
                });
                this.packages = tempList;
            })
            .catch((error) => {
            });
    }
}




