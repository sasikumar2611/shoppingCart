import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const location = useLocation();
  const userRole = localStorage.getItem("userRole") || "";

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/Login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
