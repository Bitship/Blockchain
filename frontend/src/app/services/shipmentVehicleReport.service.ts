import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Package, ShipmentVehicleReport } from '../org.bitship';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ShipmentVehicleReportService {
    private NAMESPACE_SHIPMENT_TRANSFER: string = 'org.bitship.ShipmentVehicleReport';
    constructor(private dataService: DataService<ShipmentVehicleReport>) {
    };

    public postTransaction(transfer: any): Observable<ShipmentVehicleReport> {
        return this.dataService.add(this.NAMESPACE_SHIPMENT_TRANSFER, transfer);
    }
}
