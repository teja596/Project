import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useReducer, useSelector } from "react-redux";
const ProtectedRoute = (props) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return userInfo ? props.children : <Navigate to="/login" />;
};

export default ProtectedRoute;
