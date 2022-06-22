import {Express} from 'express';
import {corsPrivate} from '../utils/cors';
import {errorMessage} from '../utils/helper';

import orders from '../routes/orders';
import authentication from '../routes/authentication';
import products from '../routes/products';

module.exports = (app: Express) => {

    app.use(corsPrivate);

    app.use('/api/authentication', authentication);

    app.use('/api/orders', orders);
    
    app.use('/api/products', products);

    app.use(errorMessage);
};