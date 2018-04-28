import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Package, ShipmentTransfer } from '../org.bitship';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ShipmentDeliverService {
    private NAMESPACE = 'org.bitship.ShipmentDeliver';
    constructor(private dataService: DataService<any>) {
    };

    public postShipmentDeliver(packageBarcode: string): Observable<any> {
        const shipmentDeliver = {
            $class: this.NAMESPACE,
            vehicle: 'toyotaTruck',
            package: packageBarcode,
        }
        return this.dataService.add(this.NAMESPACE, shipmentDeliver);
    }
}
