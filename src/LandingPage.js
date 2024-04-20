import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { SignInButton, SignUpButton, useUser } from '@clerk/clerk-react';
function LandingPage() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  function LandingPage() {
    const navigate = useNavigate();
    const { isSignedIn } = useUser();

    useEffect(() => {
      if (isSignedIn) {
        navigate('/app');  // Ensures that if the user is already signed in, they are redirected.
      }
    }, [isSignedIn, navigate]);

    const handleAfterSignUp = (user) => {
      // Redirect to payment page after successful sign up
      navigate('/checkout');
    };
    useEffect(() => {
      if (isSignedIn) {
        navigate('/app');
      }
    }, [isSignedIn, navigate]);
    return (
      <div className="landing">
        <header className="header">
          <h1>Mick Goodrick's Cycles using Meta-Harmony Colors</h1>
          <div>
            <SignInButton redirectTo="/app">Login</SignInButton>
            <SignUpButton afterSignUp={handleAfterSignUp} redirectTo="/app">Register</SignUpButton>
          </div>
        </header>
        <section className="intro">
          <p>Welcome to the interactive exploration of Mick Goodrick's cycles, visualized through Meta-Harmony colors. Discover the intricate relationships between musical notes and their harmonic functions as you navigate through the cycles.</p>
        </section>
        <section className="features">
          <h2>Features</h2>
          <ul>
            <li>Interactive Cycles Display</li>
            <li>Real-time Audio Playback</li>
            <li>Color-coded Harmony Analysis</li>
          </ul>
        </section>
        <footer className="footer">
          <p>© 2024 Mick Goodrick's Cycles. All rights reserved.</p>
        </footer>
      </div>
    );
  }
}
export default LandingPage;