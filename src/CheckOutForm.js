import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

// function CheckoutForm() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!stripe || !elements) {
//       return;
//     }

//     const card = elements.getElement(CardElement);
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: card,
//       billing_details: { email },
//     });

//     if (error) {
//       console.error('Error:', error);
//       return;
//     }

//     const response = await fetch('/create-customer-and-subscribe', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, paymentMethodId: paymentMethod.id }),
//     });

//     if (response.ok) {
//       navigate('/app'); // Redirect on successful payment and registration
//     } else {
//       console.error('Payment or subscription creation failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required />
//       <CardElement />
//       <button type="submit" disabled={!stripe}>Pay $1 and Subscribe</button>
//     </form>
//   );
// }
// Imports and setup as previously described...

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: card,
      billing_details: { email },
    });

    if (error) {
      console.error('Error:', error);
      return;
    }

    const response = await fetch('/create-customer-and-subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, paymentMethodId: paymentMethod.id }),
    });

    if (response.ok) {
      navigate('/app');  // Only redirect after confirming the subscription is active
    } else {
      console.error('Payment or subscription creation failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required />
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay $1 and Subscribe</button>
    </form>
  );
}




export default CheckoutForm;
