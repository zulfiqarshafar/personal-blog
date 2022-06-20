import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function PrivateLayout() {
  const location = useLocation();
  const accessToken = localStorage.getItem("accesstoken");

  return accessToken ? (
    <>
      <AdminSidebar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} replace />
  );
}

export default PrivateLayout;
