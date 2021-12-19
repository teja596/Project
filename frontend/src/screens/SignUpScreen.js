import { Formik, Form } from "formik";
import * as Yup from "yup";
import React,{useEffect} from "react";
import AuthLayout from "../components/layout/AuthLayout";
import FormGroup from "../components/layout/FormGroup";
import { register,userRegisterClear } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import SpinIcon from "../components/layout/SpinIcon";
import Alert from "../components/layout/Alert";
import { useNavigate } from "react-router-dom";
const SignUpScreen = () => {
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const signupSchema = Yup.object({
    name: Yup.string()
      .min(6, "name is too short")
      .max(50, "name is to long")
      .required("name  required"),
    email: Yup.string()
      .email("Invalid email address")
      .min(6, "email is too short")
      .max(50, "email is to long")
      .required("Email address required"),
    password: Yup.string()
      .min(6, " password is too short")
      .max(30, " password is too long")
      .required("Password required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("confirmPassword is required"),
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(userRegisterClear());
      }, 5000);
    }
    if (userInfo) {
      setTimeout(() => {
        dispatch(userRegisterClear());
        navigate("/login");
      }, 5000);
    }
  }, [userInfo, error]);
  return (
    <AuthLayout>
      <div className="col-md-6 ">
        <h3 className="mb-3">Create a new Account.</h3>
        {error && <Alert type="danger" text={error} />}
        {userInfo && (
          <Alert
            type="success"
            text={`Account Created for ${userInfo.email} Successfully`}
          />
        )}
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signupSchema}
          onSubmit={(values) => {
            console.log(values);
            const { name, email, password } = values;
            dispatch(register(name, email, password));
          }}
        >
          {(formik) => (
            <Form>
              <FormGroup
                label="Full Name"
                name="name"
                type="text"
                placeholder="Enter full name"
              />

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
              <FormGroup
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
              />
              <div className="form-group">
                <button className="btn btn-primary" type="submit">
                  Signup{" "}
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

export default SignUpScreen;
