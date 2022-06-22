import { development } from '../utils/environment';

const stripeApiKey = development ? process.env.STRIPE_API_KEY_DEVELOPMENT  : process.env.STRIPE_API_KEY_PRODUCTION;

const stripe = require('stripe')(stripeApiKey);

export default stripe;
