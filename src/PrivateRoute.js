// PrivateRoute.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = () => {
  const { authenticated } = useAuth();

  return authenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
