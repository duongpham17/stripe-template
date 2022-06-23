import styles from './Checkout.module.scss';
import React from 'react';

import Basket from './basket';
import Address from './address';
import Payment from './payment';

import useCheckoutContext from './useCheckoutContext';

const Checkout = () => {

  const context = useCheckoutContext();

  const {stripeOption} = context;

  return (
    <div className={styles.container}>

      <Basket {...context} />

      {<Address {...context} />}

      {stripeOption.clientSecret && <Payment {...context} />}

    </div>
  )
}

export default Checkout;