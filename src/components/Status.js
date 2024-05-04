import React, { useContext, useState, useEffect } from 'react'
import { AccountContext } from './Account'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Status = () => {
    const [status, setStatus] = useState(false);

    const { isLoggedIn, getSession, logOut } = useContext(AccountContext);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
      const checkUser = async () => {
        try {
          const session = await getSession();
          console.log("Session: ", session);
          setStatus(true);
        } catch (err) {
          setStatus(false);
        }
      };
    
      checkUser();
    }, [isLoggedIn]);
    
    const handleLogOut = () => {
      logOut();
      navigate('/'); // Redirect to start page after logout
    };

  return (
    <div>{status ? <Button variant="contained" onClick={handleLogOut}>Sign Out</Button> : "Please log in"} </div>
  )
}

export default Status;