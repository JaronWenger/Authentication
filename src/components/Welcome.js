import React, { useContext, useEffect, useState } from 'react';
import { AccountContext } from './Account';
import Button from '@mui/material/Button'; // Importing Material UI Button
import { useNavigate } from 'react-router-dom'; // Hook to navigate between routes

const Welcome = () => {
  const { getSession, logOut } = useContext(AccountContext); // Context for account-related operations
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    getSession()
      .then((session) => {
        setEmail(session['email']); // Set email from the session
      })
      .catch((err) => {
        console.error('Error getting session:', err);
      });
  }, [getSession]);

  const handleLogOut = () => {
    logOut(); // Log out the user
    navigate('/'); // Redirect to the root route after logging out
  };

  return (
    <div>
      <h1>Welcome, {email}</h1>
      <Button variant="contained" color="primary" onClick={handleLogOut}>
        Sign Out
      </Button> {/* Log out button */}
    </div>
  );
};

export default Welcome;
