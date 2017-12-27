/**
 * entry point
*/
const express = require('express');
const bodyParser = require('body-parser');

const apiRouter = require('./routes');

const app = express();

app.use(bodyParser.json());

app.use('/api/v1', apiRouter);

app.listen(5000);

