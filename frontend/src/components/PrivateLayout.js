import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
// import useAuth from "../utils/context/AuthProvider";

function PrivateLayout() {
  // const { auth } = useAuth();
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
