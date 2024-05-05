import React, { useState, useContext } from 'react'
import { AccountContext } from './Account';

import { useNavigate } from 'react-router-dom';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export const LogIn = ({ onSwitchToSignUp }) => {

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState(null); // State to track error messages

        const { authenticate } = useContext(AccountContext);

        const navigate = useNavigate(); // Hook to navigate between routes


        const onSubmit = (event) => {
            event.preventDefault();


            authenticate(email, password)
            .then((data) => {
                console.log("Logged in!", data);
                setError(null); // Clear any previous errors on successful login
                navigate('/welcome'); // Redirect to welcome page after login
            })
            .catch((err) => {
                console.log("Failed to log in", err);
                setError("Incorrect email or password"); // Display error message
                setEmail(''); // Clear email field on error
                setPassword(''); // Clear password field on error
            })

        };


        return (
            <div className="container">
                <form className="form-container" onSubmit={onSubmit}>

                    <h2>Log In</h2>

                    {error && (
                    <div style={{ color: 'red', padding: '10px', border: '1px solid red' }}>
                        {error} {/* Display error message */}
                    </div>
                    )}

                    <TextField label="Email" variant="outlined" value={email} onChange = {(event) => setEmail(event.target.value)}/>

                    <TextField label="Password" variant="outlined" value={password} onChange = {(event) => setPassword(event.target.value)}/>

                    <Button variant="contained" type="submit">Sign In</Button>

                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}> {/* Applying flexbox */}
                    <Button variant="text" onClick={() => navigate('/signup')}>
                        Create Account
                    </Button>

                    <Button variant="text" type="button" onClick={() => navigate('/reset')}>
                        Forgot Password
                    </Button>
                    </div>

                </form>
            </div>
        )
}
