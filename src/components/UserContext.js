import React, { createContext, useState } from 'react';

// Create a context for user data
const UserContext = createContext();

// Provider component to wrap the application and manage user data
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  //These functions update the context's state with the respective user data. 
  const setUserEmail = (email) => {
    setUser((prevState) => ({ ...prevState, email }));
  };
  const setUserPassword = (password) => {
    setUser((prevState) => ({ ...prevState, password }));
  };

  return (
    <UserContext.Provider value={{ user, setUserEmail, setUserPassword }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
