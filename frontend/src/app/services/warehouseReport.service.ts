import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Package, WarehouseReport } from '../org.bitship';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class WarehouseReportService {
    private NAMESPACE: string = 'org.bitship.WarehouseReport';
    constructor(private dataService: DataService<WarehouseReport>) {
    };

    public postTransaction(transfer: any): Observable<WarehouseReport> {
        return this.dataService.add(this.NAMESPACE, transfer);
    }
}
