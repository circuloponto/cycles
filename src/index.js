import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';



const stripePromise = loadStripe('pk_test_51JcVPkCmJJRRj2KyeO4zFwU2KGnYg5EgyR1vcOLxtayaTLKsMtDKLbKTlXpGRn8QokT4AewxcwmsHR6hrVtfG3WR00FNlTBZR4');

const frontendApi = process.env.REACT_APP_CLERK_FRONTEND_API;
console.log(frontendApi);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={'pk_test_c3Rhci1mbHktNDUuY2xlcmsuYWNjb3VudHMuZGV2JA'}>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </ClerkProvider>
    </BrowserRouter>
  </React.StrictMode >
);