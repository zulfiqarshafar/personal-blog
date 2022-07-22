import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function LoginLayout() {
  const location = useLocation();

  const accessToken = localStorage.getItem("accesstoken");

  return !accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/articles" state={{ from: location }} replace />
  );
}

export default LoginLayout;
