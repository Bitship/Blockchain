import { Injectable } from '@angular/core';
import { DataService } from '../../../data.service';
import { Observable } from 'rxjs/Observable';
import { Package } from '../../../org.bitship';
import 'rxjs/Rx';

@Injectable()
export class CreatePackageService {
    private NAMESPACE: string = 'org.bitship.Package';
    constructor(private dataService: DataService<Package>) {
    };

    public addAsset(itemToAdd: any): Observable<Package> {
        return this.dataService.add(this.NAMESPACE, itemToAdd);
    }
}
