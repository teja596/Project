import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useReducer, useSelector } from "react-redux";
const AdminRoute = (props) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // console.log(userInfo.isAdmin);
  return userInfo ? (
    userInfo.isAdmin === "true" ? (
      props.children
    ) : (
      <Navigate to="/login" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoute;
