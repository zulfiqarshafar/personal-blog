import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar";

function PrivateLayout() {
  const location = useLocation();
  const accessToken = localStorage.getItem("accesstoken");

  return accessToken ? (
    <>
      <Sidebar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} replace />
  );
}

export default PrivateLayout;
