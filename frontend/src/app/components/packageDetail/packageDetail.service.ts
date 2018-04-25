import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs/Observable';
import { Package, Customer } from '../../org.bitship';
import 'rxjs/Rx';

@Injectable()
export class PackageDetailService {
    private NAMESPACE = 'org.bitship.Package';
    constructor(private dataService: DataService<Package>, private customerService: DataService<Customer>) {
    };

    public getSingle(id: string): Observable<Package> {
        return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public getSingleCustomer(customerId: string): Observable<Customer> {
        return this.customerService.getSingle('org.bitship.Customer', customerId)
    }
}
