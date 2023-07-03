import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = checkLoginToken();

  return isAuthenticated ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Navigate to="/login" replace />
  );
};

const checkLoginToken = () => {
  const token = localStorage.getItem('loginToken');
  return token !== null;
};

export default PrivateRoute;
