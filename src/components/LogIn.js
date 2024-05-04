import React, { useState, useContext } from 'react'
import { AccountContext } from './Account';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export const LogIn = ({ onSwitchToSignUp }) => {

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        const { authenticate } = useContext(AccountContext);


        const onSubmit = (event) => {
            event.preventDefault();


            authenticate(email, password)
            .then((data) => {
                console.log("Logged in!", data);
            })
            .catch((err) => {
                console.log("Failed to log in", err);
            })

        };


        return (
            <div className="container">
                <form className="form-container" onSubmit={onSubmit}>

                    <TextField label="Email" variant="outlined" value={email} onChange = {(event) => setEmail(event.target.value)}/>

                    <TextField label="Password" variant="outlined" value={password} onChange = {(event) => setPassword(event.target.value)}/>

                    <Button variant="contained" type="submit">Sign In</Button>

                    <Button variant="text" onClick={onSwitchToSignUp}>Create Account</Button>

                </form>
            </div>
        )
}
