import { Asset } from './org.hyperledger.composer.system';
import { Participant } from './org.hyperledger.composer.system';
import { Transaction } from './org.hyperledger.composer.system';
import { Event } from './org.hyperledger.composer.system';

export enum SessionStatus {
    IN_VEHICLE,
    IN_WAREHOUSE,
    ASSIGN,
    PENDING,
    DONE,
    LOST
}
enum InspectionStatus {
    OK,
    NOT_OK
}
export class Location {
    lat: number;
    lon: number;
}

// Asset
export class Package extends Asset {
    sender: Customer;
    barcode: string;
    location: Location;
    status: SessionStatus;
    receiverAddress: string;
    receiverPhone: string;
    receiverName: string;
    weight: number;
}

// Participant
export class Customer extends Participant {
    customerId: string;
    firstName: string;
    lastName: string;
    phone: number;
    address: string;
}

export class Warehouse extends Participant {
    packages: Package[];
    warehouseId: string;
    location: Location;
}

export class Inspector extends Participant {
    warehouse: Warehouse;
    inspectorId: string;
    name: string;
}
export class ShipmentVehicle extends Participant {
    packages: Package[];
    shipmentVehicleId: string;
    location: Location;
}

export class PackageBarcode {
    barcode: string;
}
// Transaction
export class ShipmentTransfer extends Transaction {
    vehicle: ShipmentVehicle;
    packages: Package[];
    status: SessionStatus;
}

export class ShipmentVehicleReport {
    inspector: Inspector;
    shipmentVehicle: ShipmentVehicle;
    packages: Package[];
    status: InspectionStatus;
    note: String;
}

export class WarehouseReport {
    inspector: Inspector;
    packages: Package[] ;
    warehouse: Warehouse;
    shipmentVehicle: ShipmentVehicle ;
    note: string;
  }
