import React from "react";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import Dashboard from "./screens/Dashboard";
import AdminDashboard from "./screens/AdminDashboard";
import ApplyBankAcountScreen from "./screens/ApplyBankAcountScreen";
import { DepositScreen } from "./screens/DepositScreen";
import WithdrawlScreen from "./screens/WithdrawlScreen";
import UpdatePINScreen from "./screens/UpdatePINScreen";
import UpdateAccount from "./screens/UpdateAccount";
import Statement from "./screens/Statement";
import AccountCreationRequestsScreen from "./screens/AccountCreationRequestsScreen";
import ProtectedRoute from "./hrc/ProtectedRoute";
import AdminRoute from "./hrc/AdminRoute";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" exact element={<LoginScreen />} />
        <Route path="/signup" exact element={<SignUpScreen />} />
        <Route
          path="/dashboard"
          exact
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/apply-for-account"
          exact
          element={
            <ProtectedRoute>
              <ApplyBankAcountScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/deposit"
          exact
          element={
            <ProtectedRoute>
              <DepositScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/withdrawl"
          exact
          element={
            <ProtectedRoute>
              <WithdrawlScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/withdrawl"
          exact
          element={
            <ProtectedRoute>
              <WithdrawlScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-PIN"
          exact
          element={
            <ProtectedRoute>
              <UpdatePINScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-account"
          exact
          element={
            <ProtectedRoute>
              <UpdateAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/statement"
          exact
          element={
            <ProtectedRoute>
              <Statement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Admin-dashboard"
          exact
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/account-requests"
          exact
          element={
            <AdminRoute>
              <AccountCreationRequestsScreen />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
