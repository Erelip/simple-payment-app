import React from 'react';
import {
  useLocation,
  Navigate,
} from 'react-router-dom';

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  let location = useLocation();
  const token = sessionStorage.getItem('access_token');
  if (token !== undefined && token !== null) {
      return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

export default RequireAuth;