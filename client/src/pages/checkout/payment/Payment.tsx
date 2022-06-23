import React from 'react';
import Box from '../component/Box';

import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from 'utils/stripePromise';

const Payment = (props: any) => {

  const {order, stripeOption} = props;

  console.log(stripeOption);

  return (
    <Box title="Payment" currentStage={order.stage} stage="payment">
      <Elements stripe={stripePromise} options={stripeOption}>
        <CheckoutForm stripeOption={stripeOption} />
      </Elements>
    </Box>
  )
}

export default Payment;