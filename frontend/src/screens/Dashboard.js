import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import AccountInfo from "../components/user/AccountInfo";
import UserInfo from "../components/user/UserInfo";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="row mt-4">
        <UserInfo />
        <AccountInfo />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
