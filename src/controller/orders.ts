/*
  stripe events references.
  https://stripe.com/docs/api/events/types
*/

import { Request, Response } from 'express';
import Orders from '../model/orders';
import {InjectUserToRequest} from './@types';
import stripe from '../utils/stripe';

exports.orderGet = async (req: InjectUserToRequest, res: Response) => {

  const user = req.user.id;

  const orders = await Orders.find({user}).sort({createdAt: -1});

  res.status(200).json({
    status: "success",
    orders
  });
};

exports.orderCreate = async (req: Request, res: Response) => {

    const orders = req.body.orders;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(orders.total * 100).toFixed(0),
      currency: 'gbp',
      payment_method_types: ['card']
    });

    const stripe_client_secret = paymentIntent.client_secret;
    const email = orders.address.email_address;
    const total = orders.total.toFixed(2);

    await Orders.create({...orders, stripe_client_secret, total });

    res.status(200).json({
      status: "success",
      clientSecret: stripe_client_secret,
      amount: orders.total
    });
};

exports.orderDelete = async (req: Request, res: Response) => {

  await Orders.findOneAndDelete({stripe_client_secret: req.params.secret});

  res.status(200).json({
    status: "success",
  });
};