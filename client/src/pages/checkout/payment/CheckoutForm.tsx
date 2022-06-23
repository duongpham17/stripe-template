import styles from './CheckoutForm.module.scss';
import React, {useState} from 'react';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';

const CheckoutForm = ({stripeOption}: any) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (event: React.FormEvent) => {
    setLoading(true);
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    // Stripe.js has not yet loaded.
    // Make sure to disable form submission until Stripe.js has loaded.
    if (!stripe || !elements) return setLoading(false);
    
    const URL = process.env.NODE_ENV === "development" ? process.env.REACT_APP_DEVELOPMENT_FRONTEND_URL: process.env.REACT_APP_PRODUCTION_FRONTEND_URL;

    //`Elements` instance that was used to create the Payment Element
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${URL}/order/status/${stripeOption.clientSecret}`,
      },
    })

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
    setLoading(false);
  };
  
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Submit</button>
      {loading &&
        <div className={styles.loadingContainer}>
          <div className={styles.processing}>
            <div>
              <p>Do not close browser, processing...</p>
              <div className='loading-30 center' />
              </div>
          </div>
        </div>
      }
    </form>
  );
};

export default CheckoutForm