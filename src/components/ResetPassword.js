import React, { useState } from 'react';
import UserPool from '../UserPool';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [step, setStep] = useState(1); // Step 1: Request reset, Step 2: Complete reset
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Hook for navigation

  const requestReset = (event) => {
    event.preventDefault();

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    cognitoUser.forgotPassword({
      onSuccess: (data) => {
        console.log("Reset code sent:", data);
        setStep(2); // Move to Step 2 to complete the reset
        setError(null); // Clear previous errors
      },
      onFailure: (err) => {
        console.error("Failed to send reset code:", err);
        setError(err.message); // Display error message
      },
    });
  };

  const completeReset = (event) => {
    event.preventDefault();

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    cognitoUser.confirmPassword(resetCode, newPassword, {
      onSuccess: () => {
        console.log("Password reset successful");

        // Authenticate with new password
        const authDetails = new AuthenticationDetails({
          Username: email,
          Password: newPassword,
        });

        cognitoUser.authenticateUser(authDetails, {
          onSuccess: (authData) => {
            console.log("Authenticated after reset:", authData);
            setError(null); // Clear any previous errors
            navigate('/welcome'); // Redirect to the welcome page after successful authentication
          },
          onFailure: (authErr) => {
            console.error("Failed to authenticate after reset:", authErr);
            setError("Authentication failed after password reset."); // Display error message
          },
        });
      },
      onFailure: (err) => {
        console.error("Failed to reset password:", err);
        setError(err.message); // Display error message
      },
    });
  };

  return (
    <div className="container">
      <form onSubmit={step === 1 ? requestReset : completeReset}>
        {step === 1 ? (
          <div>
            <h2>Request Password Reset</h2>

            {error && (
              <div style={{ color: 'red', padding: '10px', border: '1px solid red' }}>
                {error}
              </div>
            )}

            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <Button variant="contained" type="submit">Request Reset Code</Button>
          </div>
        ) : (
          <div>
            <h2>Reset Your Password</h2>

            {error && (
              <div style={{ color: 'red', padding: '10px', border: '1px solid red' }}>
                {error}
              </div>
            )}

            <TextField
              label="Reset Code"
              variant="outlined"
              value={resetCode}
              onChange={(event) => setResetCode(event.target.value)}
            />

            <TextField
              label="New Password"
              variant="outlined"
              type="text" 
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />

            <Button variant="contained" type="submit">Reset Password</Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
