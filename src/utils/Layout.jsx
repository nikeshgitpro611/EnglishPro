import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "../components/pages/Login";
import Dashboard from "../components/pages/Dashboard";
import ManageRole from "../components/pages/ManageRole";
import MainLayout from "./MainLayout";

/**
 * Protected Layout
 * Wraps all authenticated routes
 */
const ProtectedLayout = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

/**
 * App Routes
 */
const Layout = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedLayout />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/manage-role" element={<ManageRole />} />
            <Route path="/help" element={<Dashboard />} />
            <Route path="/profile" element={<Dashboard />} />
          </Route>
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;
