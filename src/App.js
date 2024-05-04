import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { Account } from "./components/Account";
import Status from "./components/Status";
import Welcome from "./components/Welcome";
import { ConfirmAccount } from "./components/ConfirmAccount";
import { LogIn } from "./components/LogIn";
import { SignUp } from "./components/SignUp";

import { UserProvider } from './components/UserContext'; 




function App() {
  return (
    <UserProvider> {/* Wrap the application with UserProvider */}
    <Account>
      <Router>
        <Status />
        <Routes>
          {/* Route for login/signup */}
          <Route path="/" element={<LogIn />} />

          {/* Route for login/signup */}
          <Route path="/signup" element={<SignUp />} />

          {/* Route for the welcome page */}
          <Route path="/welcome" element={<Welcome />} />

          {/* Redirect to login if the route does not exist */}
          <Route path="*" element={<Navigate to="/" />} />

          {/* Route for account confirmation */}
          <Route path="/confirm" element={<ConfirmAccount />} />


        </Routes>
      </Router>
    </Account>
    </UserProvider> 
  );
}

export default App;
