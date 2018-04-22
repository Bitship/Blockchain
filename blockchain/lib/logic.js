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
 * Sample transaction
 * @param {org.bitship.ShipmentTransfer} shipmentTransfer
 * @transaction
 */
async function shipmentTransfer(tx) {


    // // Save the old value of the asset.
    // const oldValue = tx.asset.value;

    // // Update the asset with the new value.
    // tx.asset.value = tx.newValue;

    // // Get the asset registry for the asset.
    // const assetRegistry = await getAssetRegistry('org.bitship.SampleAsset');
    // // Update the asset in the asset registry.
    // await assetRegistry.update(tx.asset);

    // // Emit an event for the modified asset.
    // let event = getFactory().newEvent('org.bitship', 'SampleEvent');
    // event.asset = tx.asset;
    // event.oldValue = oldValue;
    // event.newValue = tx.newValue;
    // emit(event);
}

/**
 * Sample transaction
 * @param {org.bitship.PackageHistoryQuery} packageHistoryQuery
 * @transaction
 */
async function packageHistoryQuery(transaction) {
    const packageId = transaction.packageId
    const nativeSupport = transaction.nativeSupport;

    const nativeKey = getNativeAPI().createCompositeKey('Asset:org.bitship.Package', [packageId]);
    const iterator = await getNativeAPI().getHistoryForKey(nativeKey);
    let results = [];
    let res = {done : false};
    while (!res.done) {
        res = await iterator.next();

        if (res && res.value && res.value.value) {
            let val = res.value.value.toString('utf8');
            if (val.length > 0) {
                // results.push(JSON.parse(val));
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
