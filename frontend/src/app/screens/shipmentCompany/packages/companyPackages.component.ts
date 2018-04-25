import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../../services/package.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-viewPackages',
    templateUrl: './companyPackages.component.html',
    styleUrls: ['./companyPackages.component.css'],
    providers: [PackageService]
})
export class CompanyPackagesComponent implements OnInit {
    private packages;
    private errorMessage;

    constructor(private packageService: PackageService, private router: Router) {
    }

    ngOnInit() {
        this.loadPendingPackages();
    }

    loadPendingPackages(): Promise<any> {
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
