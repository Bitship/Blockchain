import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Package, ShipmentTransfer } from '../org.bitship';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ShipmentTransferService {
    private NAMESPACE_SHIPMENT_TRANSFER: string = 'org.bitship.ShipmentTransfer';
    constructor(private dataService: DataService<ShipmentTransfer>) {
    };

    public postShipmentTransaction(transfer: any): Observable<ShipmentTransfer> {
        return this.dataService.add(this.NAMESPACE_SHIPMENT_TRANSFER, transfer);
    }
}
