
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import UserDashboard from "@/components/dashboard/UserDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user?.role === "admin" ? (
        <AdminDashboard />
      ) : (
        <UserDashboard />
      )}
    </div>
  );
};

export default Dashboard;
