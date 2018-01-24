
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
// session
app.use(session({
    secret: 'zskey',
    cookie: { maxAge: 1000 * 60 * 30 },
    resave: true,
    rolling: true,
    saveUninitialized: false,
}));
const filterPath = ['login', 'register'];
// app.use((req, res, next) => {
//     console.log(req.session.cookie._expires);
//     const { session: { loginUser }, path } = req;
//     // 过滤指定路由
//     const isFilterPath = filterPath.every(item => path.indexOf(item) === -1);
//     if (isFilterPath) {
//         if (!loginUser) {
//             res.send(formatSessionResponse());
//             return;
//         }
//         res.cookie('userName', loginUser, { maxAge: 1800000 });
//     }
//     next();
// });


app.use('/api/v1', apiRouter);

/*eslint-disable*/

app.use((err, req, res, next) => {
    logger.error(err);
    res.status(500).send(formatErrorResponse());
});
app.listen(5000);

