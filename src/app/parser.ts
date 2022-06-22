import {Express} from 'express';
import cookie from 'cookie-parser';

module.exports = (app: Express, express: any): void => {

    app.use(express.json({ limit: '100kb' }));

    app.use(express.urlencoded({extended: true}));

    app.use(cookie());

}