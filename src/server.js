'use strict';

const express = require('express');

const app = express();

const session = require('express-session');

const expressStatic = require('express-static');

const bodyParser = require('body-parser');

app.use(bodyParser());

app.use(session({
    secret: process.env.SESSION_SECRET || ' 123456 ',
}));

app.use(require('./routes'));

app.use(expressStatic(`${__dirname}/public`));


app.listen(process.env.PORT || 8080);