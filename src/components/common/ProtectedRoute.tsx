// src/components/common/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth'; // Fixed import path

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'musician' | 'venue' | 'any';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredUserType = 'any' 
}) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show loading spinner or skeleton
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // If user is not logged in, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if the user has the required type
  if (requiredUserType !== 'any' && currentUser.userType !== requiredUserType) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If user is logged in and has proper permissions, render the children
  return <>{children}</>;
};

export default ProtectedRoute;