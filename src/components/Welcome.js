import React, { useContext, useEffect, useState, useRef } from 'react';
import { AccountContext } from './Account';
import Button from '@mui/material/Button'; // Material UI Button
import { useNavigate } from 'react-router-dom'; // Navigation hook
import { Fireworks } from 'fireworks-js'; // Fireworks library

const Welcome = () => {
  const { getSession, logOut } = useContext(AccountContext);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const fireworksRef = useRef(null); // Reference to the fireworks container

  const startFireworks = () => {
    const fireworksOptions = {
      rocketsPoint: {
        min: 0,
        max: 100,
      },
      speed: 2,
      acceleration: 1.1,
      friction: 0.98,
      gravity: 1,
      particles: 300,
      trace: 3,
      explosion: 5,
    };

    

    if (fireworksRef.current) {
      const fireworks = new Fireworks(fireworksRef.current, fireworksOptions);
      fireworks.start(); // Start the fireworks effect
      setTimeout(() => {
        fireworks.stop(); // Stop after 3 seconds
      }, 20000); // Stop after a set duration
    }
  };

  useEffect(() => {
    getSession()
      .then((session) => {
        setEmail(session['email']); // Set email from the session
        startFireworks(); // Trigger the fireworks
      })
      .catch((err) => {
        console.error('Error getting session:', err);
      });
  }, [getSession]); // Dependency array ensures this effect runs on mount

  const handleLogOut = () => {
    logOut(); // Log out the user
    navigate('/'); // Redirect to the login page
  };

  return (
    <div className="welcome-container">
      <div ref={fireworksRef} className="fireworks-canvas" /> {/* Fireworks behind the text */}
      <h1 className="welcome-heading">Welcome</h1> 
      <h2 className="welcome-subheading">{email}!</h2> 

      <Button
        className="logout-button"
        variant="contained"
        color="primary"
        onClick={handleLogOut}
      >
        Sign Out
      </Button> {/* Sign-out button */}
    </div>
  );
};

export default Welcome;
