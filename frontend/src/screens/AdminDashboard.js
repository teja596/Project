import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import UserInfo from "../components/user/UserInfo";
const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="container">
        <h4 className="text-center">
          Welcome to Secure-Trans ATM Admin Dashboard
        </h4>
        <div className="d-flex justify-content-center mt-4">
          <UserInfo />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
