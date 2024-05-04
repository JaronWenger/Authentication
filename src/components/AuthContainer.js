import React, { useState } from 'react';
import { LogIn } from './LogIn';
import { SignUp } from './SignUp';

const AuthContainer = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="container">
      {isSignUp ? (
        <SignUp onSwitchToLogin={() => setIsSignUp(false)} />
      ) : (
        <LogIn onSwitchToSignUp={() => setIsSignUp(true)} />
      )}
    </div>
  );
};

export default AuthContainer;
