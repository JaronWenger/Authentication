import React, { useState, useContext } from 'react'
import UserPool from '../UserPool';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; 
import UserContext from './UserContext'; // Importing UserContext



export const SignUp = ({ onSwitchToLogin }) => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState(null); // State to track error messages
        const { setUserEmail, setUserPassword } = useContext(UserContext);
        const navigate = useNavigate();

        // Define a custom password validation function
        const isPasswordValid = (password) => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            return passwordRegex.test(password);
        };


    const onSubmit = (event) => {
        event.preventDefault();

        setError(null); // Reset error state before sign-up attempt

                // Check password validity on client-side before making Cognito request
        if (!isPasswordValid(password)) {
            setError(
            'Password should contain a combination of at least 8 characters, including lowercase letters, uppercase letters, numbers, and special symbols.'
            );
            return; // Exit early if password doesn't meet the requirements
        }



            // sign up the user
        UserPool.signUp(email, password, [], null, (err, data) => {
            if (err) {
                console.error("Sign-up error:", err);
                setError(err.message); // Use Cognito's error message
            } else {
                console.log("Sign-up successful:", data);
        
                        // Store email and password in UserContext
                setUserEmail(email);
                setUserPassword(password);
                // Redirect to authentication or confirmation route after sign-up
                navigate('/confirm'); // Navigate to a confirmation page, for example
            }
        })
    }


  return (
    <div className="container">
        <form className="form-container" onSubmit={onSubmit}>

            <h2>Create Account</h2>

            {error && (
            <div style={{ color: 'red', padding: '10px', border: '1px solid red' }}>
                {error} {/* Display error message */}
            </div>
            )}

            <TextField label="Email" variant="outlined" value={email} onChange = {(event) => setEmail(event.target.value)}/>

            <TextField label="Password" variant="outlined" value={password} onChange = {(event) => setPassword(event.target.value)}/>

            <Button variant="contained" type="submit">Create Account</Button>

            <Button variant="text" onClick={() => navigate('/')}>Log In</Button>

        </form>
    </div>
  )
}
