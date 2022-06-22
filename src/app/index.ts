require('dotenv').config({path: "./config.env" });

import express, {Express} from 'express';

const app: Express = express();

require('./security')(app);

require('./stripeWebhook')(app, express);

require('./parser')(app, express);

require('./heroku')(app, express);

require('./routes')(app);

require('./database')();

require('./port')(app);