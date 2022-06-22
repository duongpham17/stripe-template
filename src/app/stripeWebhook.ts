/* 
    stripe events references.
    https://stripe.com/docs/api/events/types

    terminal commands - 
    stripe listen --forward-to localhost:8000/webhook/payment_intent/status
    stripe trigger payment_intent.succeeded
*/

import {Express, Request, Response} from 'express';

import Orders from '../model/orders';

import stripe from '../utils/stripe';

module.exports = (app: Express, express: any) => {

    app.post('/webhook/payment_intent/status', express.raw({type: 'application/json'}), async (req: Request, res: Response) => {

        const endpointSecret = "whsec_439e6afe4d21a0fad42c99354b73e69327e44b13903d7620fe243ca9d08de831"

        let event = req.body;
        
        // Only verify the event if you have an endpoint secret defined.
        // Otherwise use the basic event deserialized with JSON.parse
        if (endpointSecret) {
            // Get the signature sent by Stripe
            const signature = req.headers['stripe-signature'];
            try {
                event = stripe.webhooks.constructEvent( req.body, signature, endpointSecret );
            } catch (err: any) {
                console.log(`⚠️  Webhook signature verification failed.`, err.message);
                return res.sendStatus(400);
            }
        }
    
        // Handle the event
        switch (event.type) {
        case 'payment_intent.succeeded':{
                // Then define and call a method to handle the successful payment intent.
                // handlePaymentIntentSucceeded(paymentIntent);
                const paymentIntent = event.data.object;
                const stripe_client_secret = paymentIntent.client_secret
                await Orders.findOneAndUpdate({stripe_client_secret}, {status: "success"}, {new: true});
            }
            break;
        case 'payment_intent.payment_failed':{
                const paymentIntent = event.data.object;
                const stripe_client_secret = paymentIntent.client_secret
                await Orders.findOneAndUpdate({stripe_client_secret}, {status: "payment_failed"}, {new: true});
            }  
            break
        case 'payment_intent.processing': {
                const paymentIntent = event.data.object;
                const stripe_client_secret = paymentIntent.client_secret
                await Orders.findOneAndUpdate({stripe_client_secret}, {status: "proccessing"}, {new: true});
            }   
            break
        case 'payment_intent.requires_action':{
            const paymentIntent = event.data.object;
            const stripe_client_secret = paymentIntent.client_secret
            await Orders.findOneAndUpdate({stripe_client_secret}, {status: "requires_action"}, {new: true});
        }
        default:
            // Unexpected event type
        }

        res.status(200).json({
            status: "success"
        })
    });

}