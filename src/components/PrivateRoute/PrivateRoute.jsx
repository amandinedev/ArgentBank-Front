import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectIsAuthenticated } from "../../reduxFeatures/authSlice";

const PrivateRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
