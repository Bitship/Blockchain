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

/**
 * Sample transaction
 * @param {org.bitship.PackageHistoryQuery} packageHistoryQuery
 * @transaction
 */
async function packageHistoryQuery(transaction) {
    const packageId = transaction.packageId
    const nativeSupport = transaction.nativeSupport;

    const assetRegistry = await getAssetRegistry('org.bitship.Package')

    const nativeKey = getNativeAPI().createCompositeKey('Asset:org.bitship.Package', [packageId]);
    const iterator = await getNativeAPI().getHistoryForKey(nativeKey);
    let results = [];
    let res = {done : false};
    while (!res.done) {
        res = await iterator.next();

        if (res && res.value && res.value.value) {
            let val = res.value.value.toString('utf8');
            if (val.length > 0) {
                // NOTE: this make each package responsed look like this: resource:org.bitship.Package#1111
                // https://gyazo.com/7ebdb4e9584deea5c96aa9ae718e1a3b
                // const pkg = JSON.parse(val)
                // const actualPkg = await assetRegistry.get(pkg.barcode)
                // results.push(actualPkg);
                results.push(val);
            }
        }
        if (res && res.done) {
            try {
                iterator.close();
            }
            catch (err) {
            }
        }
    }

    const event = getFactory().newEvent('org.bitship', 'PackageHistoryQueryResults');
    /*
    "{\"$class\":\"org.bitship.Package\",\"sender\":\"resource:org.bitship.Customer#4602\",\"barcode\":\"1111\",\"weight\":186.716,\"location\":{\"$class\":\"org.bitship.Location\",\"lat\":135.448,\"lon\":41.32},\"status\":\"CHECK_IN\",\"receiverAddress\":\"Ex ut.\",\"receiverPhone\":\"Ad.\",\"receiverName\":\"Anim non.\",\"$registryType\":\"Asset\",\"$registryId\":\"org.bitship.Package\"}",

    "{\"$class\":\"org.bitship.Package\",\"sender\":\"resource:org.bitship.Customer#4602\",\"barcode\":\"1111\",\"weight\":186.716,\"location\":{\"$class\":\"org.bitship.Location\",\"lat\":135,\"lon\":41.32},\"status\":\"CHECK_IN\",\"receiverAddress\":\"Ex ut.\",\"receiverPhone\":\"Ad.\",\"receiverName\":\"Anim non.\",\"$registryType\":\"Asset\",\"$registryId\":\"org.bitship.Package\"}"
    */
    event.results = results
    emit(event)

    return results;
}

/**
 * shipmentVehicleMove transaction
 * @param {org.bitship.ShipmentVehicleMove} shipmentVehicleMove
 * @transaction
 */
async function shipmentVehicleMove(tx) {
    const shipmentVehicleRegistry = await getParticipantRegistry('org.bitship.ShipmentVehicle');
    const packageRegistry = await getAssetRegistry('org.bitship.Package');

    tx.vehicle.location = tx.location
    await shipmentVehicleRegistry.update(tx.vehicle)

    for (const pkg of tx.vehicle.packages) {
        pkg.location = tx.location
        await packageRegistry.update(pkg)
    }
}
