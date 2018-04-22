const util = require('util')
const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const NetworkCardStoreManager = require('composer-common').NetworkCardStoreManager;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

app.use(cors());

app.use(bodyParser.json());

app.use('/', async (req, res) => {
    try {
        const cardStore = NetworkCardStoreManager.getCardStore();
        const conn = new BusinessNetworkConnection({cardStore})
        await conn.connect('admin@bitship')
        console.log(util.inspect(conn))
        const nativeAPI = conn.getNativeAPI()

        const nativeKey = getNativeAPI().createCompositeKey('Asset:org.bitship.Package', ['9837']);
        const iterator = await getNativeAPI().getHistoryForKey(nativeKey);

        let results = [];
        let res = {done : false};
        while (!res.done) {
            res = await iterator.next();

            if (res && res.value && res.value.value) {
                let val = res.value.value.toString('utf8');
                if (val.length > 0) {
                    results.push(JSON.parse(val));
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

        res.send(results)
    } catch (err) {
        console.error(err)
        res.send(err.message)
    }
});

app.server.listen(process.env.PORT || 4000, () => {
    console.log(`Started on port ${app.server.address().port}`);
});
