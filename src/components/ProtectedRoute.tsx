import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) =>
  isAuthenticated() ? children : <Navigate to="/login" />;

export default ProtectedRoute;
