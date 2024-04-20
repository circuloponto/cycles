import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import LandingPage from './LandingPage';
import AppButtonsDisabled from './AppButtonsDisabled';
import CheckoutForm from './CheckOutForm';
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={
        <SignedIn>
          <AppButtonsDisabled />
        </SignedIn>
      } />
      <Route path="/checkout" element={<CheckoutForm />} />
    </Routes>
  );
}

export default App;
