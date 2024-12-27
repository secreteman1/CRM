import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes: React.FC = () => {
  const isAuthorised = localStorage.getItem("isAuthorised");
  return isAuthorised ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
