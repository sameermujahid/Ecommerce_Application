// ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  const userId = localStorage.getItem('userId');
  const location = useLocation();

  return userId ? (
    React.cloneElement(element, { ...rest, userId })
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} />
  );
};

export default ProtectedRoute;
