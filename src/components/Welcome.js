import React, { useContext, useEffect, useState } from 'react';
import { AccountContext } from './Account';

const Welcome = () => {
  const { getSession } = useContext(AccountContext);
  const [email, setEmail] = useState('');

  useEffect(() => {
    getSession()
      .then((session) => {
        setEmail(session['email']); // Use the email from the session
      })
      .catch((err) => {
        console.error('Error getting session:', err);
      });
  }, [getSession]);

  return (
    <div>
      <h1>Welcome, {email}</h1>
    </div>
  );
};

export default Welcome;
