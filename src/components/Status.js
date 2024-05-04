import React, { useContext, useState, useEffect } from 'react'
import { AccountContext } from './Account'
import Button from '@mui/material/Button';

const Status = () => {
    const [status, setStatus] = useState(false);

    const { isLoggedIn, getSession, logOut } = useContext(AccountContext);

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
    


  return (
    <div>{status ? <Button variant="contained" onClick={logOut}>Submit</Button> : "Please log in"} </div>
  )
}

export default Status;