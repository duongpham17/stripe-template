import {loadStripe} from '@stripe/stripe-js';

const development: any = process.env.REACT_APP_DEVELOPMENT_STRIPE_API_KEY;
const production: any = process.env.REACT_APP_PRODUCTION_STRIPE_API_KEY;

const secret_key = process.env.NODE_ENV === "development" ? development : production;

export const stripePromise = loadStripe(secret_key);