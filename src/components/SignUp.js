import React, { useState, useContext } from 'react'
import UserPool from '../UserPool';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router-dom'; 
import UserContext from './UserContext'; // Importing UserContext



export const SignUp = ({ onSwitchToLogin }) => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState(null); // State to track error messages
        const { setUserEmail, setUserPassword } = useContext(UserContext);
        const navigate = useNavigate();
        const [passwordRequirements, setPasswordRequirements] = useState({
            length: false,
            lowercase: false,
            uppercase: false,
            number: false,
            special: false,
        });

        // Define a custom password validation function
        const isPasswordValid = (password) => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            return passwordRegex.test(password);
        };

        const handlePasswordChange = (event) => {
            const newPassword = event.target.value;
            setPassword(newPassword);
    
            // Update password requirements
            setPasswordRequirements({
                length: newPassword.length >= 8,
                lowercase: /[a-z]/.test(newPassword),
                uppercase: /[A-Z]/.test(newPassword),
                number: /\d/.test(newPassword),
                special: /[@$!%*?&]/.test(newPassword),
            });
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

            <TextField label="Password" variant="outlined" value={password} onChange={handlePasswordChange}/>
            {password && ( // Only render if password is not empty
                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
                        <div>
                            <FormControlLabel
                                control={<Checkbox checked={passwordRequirements.length} disabled />}
                                label="8 Characters"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={<Checkbox checked={passwordRequirements.lowercase} disabled />}
                                label="Lowercase letter"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={<Checkbox checked={passwordRequirements.uppercase} disabled />}
                                label="Uppercase letter"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={<Checkbox checked={passwordRequirements.number} disabled />}
                                label="Number"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={<Checkbox checked={passwordRequirements.special} disabled />}
                                label="Special symbol"
                            />
                        </div>
                    </div>
                )}

            <Button variant="contained" type="submit">Create Account</Button>

            <Button variant="text" onClick={() => navigate('/')}>Log In</Button>

        </form>
    </div>
  )
}
