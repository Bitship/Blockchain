import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../../services/package.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-showPackages',
    templateUrl: './showPackages.component.html',
    styleUrls: ['./showPackages.component.css'],
    providers: [PackageService]
})
export class ShowPackagesComponent implements OnInit {
    private packages;
    private errorMessage;

    constructor(private packageService: PackageService, private router: Router) {
    }

    ngOnInit() {
        this.loadAll();
    }

    loadAll(): Promise<any> {
        let tempList = [];
        return this.packageService.getAssetsBySender('tinh1')
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
