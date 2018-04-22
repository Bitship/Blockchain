/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * ShipmentTransfer transaction will handle three status : ASSIGN, CHECK_IN
 * @param {org.bitship.ShipmentTransfer} shipmentTransfer
 * @transaction
 */
async function shipmentTransfer(shipmentTransfer) {
    const packageRegistry = await getAssetRegistry("org.bitship.Package");
    let event = getFactory().newEvent('org.bitship', 'ShipmentTransfered');
    switch (shipmentTransfer.status) {
        case 'IN_VEHICLE':
            // Update status and location for package            
            for (const packageObject of shipmentTransfer.packages) {
                packageObject.status = shipmentTransfer.status;
                packageObject.location = shipmentTransfer.vehicle.location;
                await packageRegistry.update(packageObject);
                event.package = packageObject;
                event.message = "Success";
                emit(event);
            }
            break;
            
        case 'ASSIGN':
            // Add expected packages to vehicle
            const shipmentVehicleRegistry = await getParticipantRegistry("org.bitship.ShipmentVehicle");
            if (shipmentTransfer.vehicle.packages){
                shipmentTransfer.vehicle.packages = shipmentTransfer.vehicle.packages.concat(shipmentTransfer.packages);
            } else {
                shipmentTransfer.vehicle.packages = shipmentTransfer.packages;
            }
            
            shipmentVehicleRegistry.update(shipmentTransfer.vehicle);

            // Update status for package
            for (const packageObject of shipmentTransfer.packages) {
                packageObject.status = shipmentTransfer.status;
                await packageRegistry.update(packageObject);
                event.package = packageObject;
                event.message = "Success";
                emit(event);
            }
            break;
    }
}


/**
 * ShipmentTransfer transaction will handle three status : ASSIGN, CHECK_IN
 * @param {org.bitship.WarehouseReport} warehouseReport
 * @transaction
 */
async function warehouseReport(warehouseReport) {

    const packageRegistry = await getAssetRegistry("org.bitship.Package");
    let event = getFactory().newEvent('org.bitship', 'ShipmentTransfered');

    // Update status for package
    for (const packageObject of shipmentTransfer.packages) {
        packageObject.status = "IN_VEHICLE";
        await packageRegistry.update(packageObject);
        event.package = packageObject;
        event.message = "Success";
        emit(event);
    }
    
    // Update for Warehouse 
    const length = shipmentTransfer.warehouse.packages.length;
    if (length == 0) return;

    const warehouseRegistry = await getParticipantRegistry("org.bitship.Warehouse");    
    for (let i = 0; i < shipmentTransfer.packages.length; i ++){
        for(let j = 0; j < length; j++){
            if (shipmentTransfer.warehouse.packages[j].barcode === shipmentTransfer.packages[i].barcode) {
                shipmentTransfer.warehouse.packages.splice(j, 1);
                break;
            }
        }
    }
    await warehouseRegistry.update(shipmentTransfer.warehouse);
}