import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import { Account } from "./components/Account";
import ProtectedRoute from './components/ProtectedRoute'; 
import Welcome from "./components/Welcome";
import { ConfirmAccount } from "./components/ConfirmAccount";
import { LogIn } from "./components/LogIn";
import { SignUp } from "./components/SignUp";
import { UserProvider } from './components/UserContext'; 
import ResetPassword from "./components/ResetPassword";

//App.js
function App() {
  return (
    <UserProvider>
    <Account>
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/welcome"
            element={<ProtectedRoute element={<Welcome />} />} // Protecting the /welcome route
          />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/confirm" element={<ConfirmAccount />} />
          <Route path="/reset" element={<ResetPassword />} />
        </Routes>
      </Router>
    </Account>
    </UserProvider> 
  );
}

export default App;
