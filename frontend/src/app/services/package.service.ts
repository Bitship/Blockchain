import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Package } from '../org.bitship';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class PackageService {
    private NAMESPACE: string = 'org.bitship.Package';
    constructor(private dataService: DataService<Package>) {
    };

    public addAsset(itemToAdd: any): Observable<Package> {
        return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public getAssetsBySender(senderId: string): Observable<Package[]> {
        const stringObjectWhere = `{"where": { "sender": "resource:org.bitship.Customer#${senderId}"}}`
        const encodeObject = encodeURIComponent(stringObjectWhere);
        return this.dataService.getObjectsByFilter(this.NAMESPACE, encodeObject);
    }

    public getAssetsWithStatus(status: string):  Observable<Package[]> {
        const stringObjectWhere = `{"where": { "status": "${status}"}}`
        const encodeObject = encodeURIComponent(stringObjectWhere);
        return this.dataService.getObjectsByFilter(this.NAMESPACE, encodeObject);
    }
}
