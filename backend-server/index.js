const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

app.use(cors());

app.use(bodyParser.json());

app.use('/', (req, res) => {
    res.send('Home')
});

app.server.listen(process.env.PORT || 4000, () => {
    console.log(`Started on port ${app.server.address().port}`);
});
