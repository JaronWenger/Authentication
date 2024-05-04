import React, { useState } from 'react'
import UserPool from '../UserPool';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export const SignUp = ({ onSwitchToLogin }) => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");


    const onSubmit = (event) => {
        event.preventDefault();

        UserPool.signUp(email, password, [], null, (err, data) => {
            if (err) {
                console.error(err);
            }
            console.log(data);
        })
    }


  return (
    <div className="container">
        <form className="form-container" onSubmit={onSubmit}>

            <TextField label="Email" variant="outlined" value={email} onChange = {(event) => setEmail(event.target.value)}/>

            <TextField label="Password" variant="outlined" value={password} onChange = {(event) => setPassword(event.target.value)}/>

            <Button variant="contained" type="submit">Create Account</Button>

            <Button variant="text" onClick={onSwitchToLogin}>Log In</Button>

        </form>
    </div>
  )
}
