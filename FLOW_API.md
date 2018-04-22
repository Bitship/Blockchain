API(0) ShipmentVehicleMove

API(1), API(2), API(4), API(7):
- endpoint get packages
- use generated REST api

API(3), API(5), API(8)
- call ShipmentTransfer transaction

API(6): update packages of shipmentVehicle status to CHECK_OUT. missing packages set to INSPECTED_NOT_OK. Also remove packages from ShipmentVehicle, push packages to Warehouse
- call ShipmentVehicleReport transaction

API(9): update scanned packages of shipmentVehicle status to CHECK_IN. not scanned packages set status to INSPECTED_NOT_OK.
- call WarehouseReport transaction

API(10): ShipmentDeliver transaction
- call ShipmentDeliver transaction

API(11): get package details
- use generated REST api

API(12): get package transfer history
