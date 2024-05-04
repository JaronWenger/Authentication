import React from "react";

import { SignUp } from "./components/SignUp";
import { LogIn } from "./components/LogIn";
import { Account } from "./components/Account";
import Status from "./components/Status";
import AuthContainer from "./components/AuthContainer";



function App() {
  return (
    <Account>
      <Status/>
      <AuthContainer/>
    </Account>
  );
}

export default App;
