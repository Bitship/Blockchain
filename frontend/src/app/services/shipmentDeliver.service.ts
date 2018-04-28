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

    public async postShipmentDeliver(packageBarcode: string) {
        const shipmentDeliver = {
            $class: this.NAMESPACE,
            vehicle: 'toyotaTruck',
            package: `resource:org.bitship.Package#${packageBarcode}`,
        }
        await this.dataService.add(this.NAMESPACE, shipmentDeliver).toPromise();
    }
}
