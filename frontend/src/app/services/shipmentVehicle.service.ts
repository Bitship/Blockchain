import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { ShipmentVehicle } from '../org.bitship';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ShipmentVehicleService {
    private NAMESPACE_SHIPMENT_TRANSFER: string = 'org.bitship.ShipmentVehicle';
    constructor(private dataService: DataService<ShipmentVehicle>) {
    };

    public getShipmentVehicle(vehicleId: any): Observable<ShipmentVehicle> {
        return this.dataService.getSingle(this.NAMESPACE_SHIPMENT_TRANSFER, vehicleId);
    }
}
