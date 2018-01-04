
/**
 * entry point
*/
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const apiRouter = require('./routes');
const logger = require('./common/logger');
const { formatErrorResponse, formatSessionResponse } = require('./common/utils');
require('./models');

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: 'zskey',
    cookie: { maxAge: 30000 },
    resave: false,
    saveUninitialized: false,
}));

app.use((req, res, next) => {
    console.log(req.session);
    const { session: { loginUser }, path } = req;
    if (path.indexOf('login') === -1 && !loginUser) {
        res.send(formatSessionResponse());
    } else {
        next();
    }
});

app.use('/api/v1', apiRouter);

/*eslint-disable*/

app.use((err, req, res, next) => {
    logger.error(err);
    res.status(500).send(formatErrorResponse());
});
app.listen(5000);

