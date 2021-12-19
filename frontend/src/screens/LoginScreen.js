import React, { useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";

import AuthLayout from "../components/layout/AuthLayout";
import FormGroup from "../components/layout/FormGroup";
import { login } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import SpinIcon from "../components/layout/SpinIcon";
import Alert from "../components/layout/Alert";
const LoginScreen = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;
  const navigate = useNavigate();
  const loginSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .min(6, "email is too short")
      .max(50, "email is to long")
      .required("Email address required"),
    password: Yup.string()
      .min(6, " password is too short")
      .max(30, " password is too long")
      .required("Password required"),
  });

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin === "true") {
        navigate("/Admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [userInfo, navigate]);

  return (
    <AuthLayout>
      <div className="col-md-6 py-5">
        <h3 className="mb-3">Login to your Account.</h3>
        {error && <Alert type="danger" text={error} />}
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            // console.log(values);
            const { email, password } = values;
            dispatch(login(email, password));
          }}
        >
          {(formik) => (
            <Form>
              <FormGroup
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter email address"
              />

              <FormGroup
                label="Password"
                name="password"
                type="password"
                placeholder="Enter password"
              />

              <div className="form-group">
                <button className="btn btn-primary">
                  Login{" "}
                  {loading ? (
                    <SpinIcon color="white" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"
                        fill="rgba(255,255,255,1)"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </AuthLayout>
  );
};

export default LoginScreen;
