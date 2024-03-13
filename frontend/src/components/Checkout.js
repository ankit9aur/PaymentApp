import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const Checkout = ({ paymentIntent, onPaymentSuccess, onPaymentFailure }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error('[Error]', error);
      onPaymentFailure(error.message);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      // Send the payment method details to the backend for further processing
      onPaymentSuccess(paymentMethod);
    }
  };

  return (
    <div>
      <h2>Stripe Checkout</h2>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </div>
  );
};

export default Checkout;
