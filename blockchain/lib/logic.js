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
 * ShipmentTransfer transaction
 * @param {org.bitship.ShipmentTransfer} shipmentTransfer
 * @transaction
 */
async function shipmentTransfer(shipmentTransfer) {

    // Package 
    shipmentTransfer.package.location = shipmentTransfer.location;
    shipmentTransfer.package.status = shipmentTransfer.status;

    const packageRegistry = await getAssetRegistry("org.bitship.Package");
    await packageRegistry.update(shipmentTransfer.package);

    // Shipment vehicle
    switch(shipmentTransfer.status){
        case 'CHECK_IN': 
            shipmentTransfer.vehicle.packages.push(shipmentTransfer.package);
            break;
        case 'CHECK_OUT':
            var length = shipmentTransfer.vehicle.packages.length;
            for (var i = length - 1; i >= 0; i -= 1) {
                if (shipmentTransfer.vehicle.packages[i].barcode === shipmentTransfer.package.barcode) {
                    shipmentTransfer.vehicle.packages.splice(i, 1);
                    break;
                }
            }
            break;
    }
    shipmentTransfer.vehicle.location = shipmentTransfer.location;
    shipmentTransfer.vehicle.driver = shipmentTransfer.shipper;

    const shipmentVehicleRegistry = await getAssetRegistry("org.bitship.ShipmentVehicle");
    await shipmentVehicleRegistry.update(shipmentTransfer.vehicle);

    // Emit an Event for the modified asset
    let event = getFactory().newEvent('org.bitship', 'EmitUpdateShipmentTransfer');
    event.package = shipmentTransfer.package;
    event.vehicle = shipmentTransfer.vehicle;
    event.message = "Success";
}
