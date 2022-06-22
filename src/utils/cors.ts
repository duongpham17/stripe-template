import cors from 'cors';
import {development} from '../utils/environment';

// whitelisted website only
export const corsPrivate = (() => {

    const productionURL: string[] = [`${process.env.WEBSITE_URL}`];

    const developmentURL: string[] = ['http://localhost:3000'];

    const whitelist: string[] = development ? developmentURL : productionURL;

    return cors({
        origin: whitelist,
        methods: ['GET','POST','DELETE','PUT','PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept'],
    });
})();

// Public use only
export const corsPublic = (() => {
    return cors({
        origin: "*",
        methods: ['GET'],
    });
})();