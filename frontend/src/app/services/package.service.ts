import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Package, ShipmentTransfer, PackageBarcode } from '../org.bitship';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class PackageService {
    private NAMESPACE_PACKAGE_ASSET: string = 'org.bitship.Package';
    private NAMESPACE_SHIPMENT_TRANSFER: string = 'org.bitship.ShipmentTransfer';

    constructor(private dataService: DataService<Package>) {
    };

    public addAsset(itemToAdd: any): Observable<Package> {
        return this.dataService.add(this.NAMESPACE_PACKAGE_ASSET, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Package> {
        return this.dataService.update(this.NAMESPACE_PACKAGE_ASSET, id, itemToUpdate);
    }

    public getAssetsBySender(senderId: string): Observable<Package[]> {
        const stringObjectWhere = `{"where": { "sender": "resource:org.bitship.Customer#${senderId}"}}`
        const encodeObject = encodeURIComponent(stringObjectWhere);
        return this.dataService.getObjectsByFilter(this.NAMESPACE_PACKAGE_ASSET, encodeObject);
    }

    public getPackagesByArrays(packages: Array<PackageBarcode>): Observable<Package[]> {
        const queryObject = `{"where":{"or": ${JSON.stringify(packages)}}}`;
        const encodeObject = encodeURIComponent(queryObject);
        return this.dataService.getObjectsByFilter(this.NAMESPACE_PACKAGE_ASSET, encodeObject);
    }

    public getAssetsWithStatus(status: string): Observable<Package[]> {
        const stringObjectWhere = `{"where": { "status": "${status}"}}`
        const encodeObject = encodeURIComponent(stringObjectWhere);
        return this.dataService.getObjectsByFilter(this.NAMESPACE_PACKAGE_ASSET, encodeObject);
    }
}
