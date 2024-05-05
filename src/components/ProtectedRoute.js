import React, { useContext, useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AccountContext } from './Account';

const ProtectedRoute = ({ element }) => {
  const { getSession } = useContext(AccountContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession()
      .then(() => {
        setIsAuthenticated(true);
        setIsLoading(false);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setIsLoading(false);
      });
  }, [getSession]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator while checking session
  }

  return isAuthenticated ? (
    element // Render the component if authenticated
  ) : (
    <Navigate to="/" /> // Redirect to login page if not authenticated
  );
};

export default ProtectedRoute;
