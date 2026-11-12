
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, token } = useContext(AuthContext);
  const location = useLocation();

  // 1. If not logged in, redirect immediately to login page
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. If route requires admin access and user is not an admin, redirect to home
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // 3. Authenticated and authorized: render the page
  return children;
};

export default ProtectedRoute;