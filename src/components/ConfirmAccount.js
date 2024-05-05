import React, { useState, useContext } from 'react';
import Pool from '../UserPool';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { AccountContext } from './Account'; // Importing AccountContext
import UserContext from './UserContext'; 

import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const ConfirmAccount = () => {
  const { user } = useContext(UserContext); // Access user data from context
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState(null); // State for error messages

  const navigate = useNavigate(); // Hook for navigation
  const { authenticate } = useContext(AccountContext); 

  const onConfirm = (event) => {
    event.preventDefault();

    const cognitoUser = new CognitoUser({
      Username: user.email,
      Pool,
    });

    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        console.error("Confirmation error:", err);
        setError("Failed to confirm account. Please check the confirmation code and try again.");
      } else {
        console.log("Account confirmed:", result);
            // Authenticate after confirmation using AccountContext
            authenticate(user.email, user.password) // Use email and password from context
            .then(() => {
              navigate('/welcome'); // Redirect after authentication
            })
            .catch((authErr) => {
              console.error("Authentication failed after confirmation:", authErr);
              setError("Failed to authenticate after confirmation.");
            });
                }
                });
            };

  return (
    <div className="container">
      <form className="form-container" onSubmit={onConfirm}>
        <h2>Confirm Your Account</h2>

        {error && (
          <div style={{ color: 'red', padding: '10px', border: '1px solid red' }}>
            {error}
          </div>
        )}


        <TextField
          label="Confirmation Code"
          variant="outlined"
          value={confirmationCode}
          onChange={(event) => setConfirmationCode(event.target.value)}
        />

        <Button variant="contained" type="submit">Confirm Account</Button>
      </form>
    </div>
  );
};
