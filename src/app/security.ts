import {Express} from 'express';
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

module.exports = (app: Express) => {
    app.use(mongoSanitize());
    app.use(xss());
}