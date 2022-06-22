import {Express} from 'express';
import {production} from '../utils/environment';
import path from 'path';

module.exports = (app: Express, express: any) => {
    if(production){

        app.use(express.static(path.join(__dirname, '../../client/build')));

        app.get('*', (req, res) => {
            res.sendFile('index.html', {root: path.join(__dirname, '../../client', 'build')});
        });
    }
};