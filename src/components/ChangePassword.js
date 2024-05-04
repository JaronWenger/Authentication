import React, { useState, useContext } from 'react'
import { AccountContext } from './Account';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default () => {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");   

    const { getSession } = useContext(AccountContext);

    const onSubmit = (event) => {
        event.preventDefault();


    getSession().then(({user}) => {
        user.changePassword(password, newPassword, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        })
    })
};


  return (
    <div>
        <form onSubmit={onSubmit}>
            <TextField label="Current Password" variant="outlined" value={password} onChange = {(event) => setPassword(event.target.value)}/>

            <TextField label="New Password" variant="outlined" value={newPassword} onChange = {(event) => setNewPassword(event.target.value)}/>

            <Button variant="contained" type="submit">Change Password</Button>
        </form>
    </div>
  )
}
