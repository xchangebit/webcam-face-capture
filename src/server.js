'use strict';

const fs = require('fs');

const express = require('express');

const app = express();

const session = require('express-session');

const expressStatic = require('express-static');

const bodyParser = require('body-parser');

const http = require('https');

const https = require('https');

const port = process.env.PORT || 8080;

let server;

app.use(bodyParser());

app.use(session({
    secret: process.env.SESSION_SECRET || ' 123456 ',
}));

app.use(require('./routes'));

app.use(expressStatic(`${__dirname}/public`));


if (process.env.ENVIRONMENT === 'PRODUCTION') {
    server = https.createServer({
        key: fs.readFileSync(process.env.SSL_KEY_FILE || `${__dirname}/key.pem`),
        cert: fs.readFileSync(process.env.SSL_CERT_FILE || `${__dirname}/cert.pem`),
    }, app);
} else {
    server = http.createServer(app);
}

server.listen(port, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log(`Running webcam face capture on port ${port}`);
});