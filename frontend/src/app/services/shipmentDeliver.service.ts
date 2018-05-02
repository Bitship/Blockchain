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

    public async postShipmentDeliver(packageBarcode: string, signature: string) {
        const shipmentDeliver = {
            $class: this.NAMESPACE,
            vehicle: 'yamahaTruck',
            package: `resource:org.bitship.Package#${packageBarcode}`,
            signature,
        }
        await this.dataService.add(this.NAMESPACE, shipmentDeliver).toPromise();
    }
}
