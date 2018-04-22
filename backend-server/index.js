const util = require('util')
const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios')

const NetworkCardStoreManager = require('composer-common').NetworkCardStoreManager;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

app.use(cors());

app.use(bodyParser.json());

app.get('/packages/:package_id/transfer_history', async (req, res) => {
    try {
        const {data} = await axios.post('http://localhost:3000/api/org.bitship.PackageHistoryQuery', {
            packageId: req.params.package_id
        })
        /*
        {
            "$class": "org.bitship.PackageHistoryQuery",
            "packageId": "1111",
            "transactionId": "9b7d595b93baaf21baf68fa52088494cbdca85f4bb6006de564a4822a5a66849",
            "timestamp": "2018-04-22T08:29:29.469Z"
        }
        */
        console.log('data:', data)
        const {transactionId} = data

        const {data: historyData} = await axios.get(`http://localhost:3000/api/queries/selectHistorianRecordsByTrxId?transactionId=${ transactionId }`)
        /*
        [
            {
                "$class": "org.hyperledger.composer.system.HistorianRecord",
                "transactionId": "9b7d595b93baaf21baf68fa52088494cbdca85f4bb6006de564a4822a5a66849",
                "transactionType": "org.bitship.PackageHistoryQuery",
                "transactionInvoked": "resource:org.bitship.PackageHistoryQuery#9b7d595b93baaf21baf68fa52088494cbdca85f4bb6006de564a4822a5a66849",
                "participantInvoking": "resource:org.hyperledger.composer.system.NetworkAdmin#admin",
                "identityUsed": "resource:org.hyperledger.composer.system.Identity#778f5917b047c8fcd72b8e72eb9dc827931175bfa79e9b2d024753701a639452",
                "eventsEmitted": [
                {
                    "$class": "org.bitship.PackageHistoryQueryResults",
                    "results": [
                    "{\"$class\":\"org.bitship.Package\",\"sender\":\"resource:org.bitship.Customer#4602\",\"barcode\":\"1111\",\"weight\":186.716,\"location\":{\"$class\":\"org.bitship.Location\",\"lat\":135.448,\"lon\":41.32},\"status\":\"CHECK_IN\",\"receiverAddress\":\"Ex ut.\",\"receiverPhone\":\"Ad.\",\"receiverName\":\"Anim non.\",\"$registryType\":\"Asset\",\"$registryId\":\"org.bitship.Package\"}",
                    "{\"$class\":\"org.bitship.Package\",\"sender\":\"resource:org.bitship.Customer#4602\",\"barcode\":\"1111\",\"weight\":186.716,\"location\":{\"$class\":\"org.bitship.Location\",\"lat\":135,\"lon\":41.32},\"status\":\"CHECK_IN\",\"receiverAddress\":\"Ex ut.\",\"receiverPhone\":\"Ad.\",\"receiverName\":\"Anim non.\",\"$registryType\":\"Asset\",\"$registryId\":\"org.bitship.Package\"}"
                    ],
                    "eventId": "9b7d595b93baaf21baf68fa52088494cbdca85f4bb6006de564a4822a5a66849#0",
                    "timestamp": "2018-04-22T08:29:48.318Z"
                }
                ],
                "transactionTimestamp": "2018-04-22T08:29:48.318Z"
            }
        ]
        */
        console.log('historyData:', historyData)

        const packages = []
        historyData.forEach((historyItem) => {
            historyItem.eventsEmitted.forEach((event) => {
                event.results.forEach((pkg) => {
                    packages.push(JSON.parse(pkg))
                })
            })
        })

        res.send(packages)
    } catch (err) {
        console.error(err)
        res.send(err.message)
    }
});

app.server.listen(process.env.PORT || 4000, () => {
    console.log(`Started on port ${app.server.address().port}`);
});
