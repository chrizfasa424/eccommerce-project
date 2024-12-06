import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * A protected route component that only allows access to superadmins
 */
interface SuperadminRouteProps {
  children: ReactNode;
}

const SuperadminRoute: React.FC<SuperadminRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const isSuperadmin = user?.role === 'admin';

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/superadmin/login" replace />;
  }

  // Redirect to unauthorized page if authenticated but not a superadmin
  if (isAuthenticated && !isSuperadmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render children if user is an authenticated superadmin
  return <>{children}</>;
};

export default SuperadminRoute;