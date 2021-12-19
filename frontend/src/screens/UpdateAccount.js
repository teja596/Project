import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormGroup from "../components/layout/FormGroup";
import DashboardLayout from "../components/layout/DashboardLayout";
import SpinIcon from "../components/layout/SpinIcon";
import Alert from "../components/layout/Alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  updateUserProfile,
  userUpdateProfileClear,
} from "../actions/userActions";
const UpdateAccount = () => {
  const dispatch = useDispatch();
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { user, loading, success, error } = userUpdateProfile;

  const userDetails = useSelector((state) => state.userDetails);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const updateAccountSchema = Yup.object({
    name: Yup.string()
      .min(6, "full name is too short")
      .max(50, "fullname is to long")
      .required("fullname  required"),
    email: Yup.string()
      .email("Invalid email address")
      .min(6, "email is too short")
      .max(50, "email is to long")
      .required("Email address required"),
    password: Yup.string()
      .min(6, "password is too short")
      .max(30, "password is too long")
      .required("Password required"),
    newPassword: Yup.string()
      .min(6, "New password is too short")
      .max(30, "New password is too long")
      .required("New Password required"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Password must match")
      .required("confirmPassword is required"),
  });

  useEffect(() => {
    dispatch(getUserDetails(userInfo._id));

    if (user) {
      setTimeout(() => {
        dispatch(userUpdateProfileClear());
      }, 4000);
    }
  }, [user, dispatch]);
  return (
    <DashboardLayout>
      <section className="col-md-6 mx-auto">
        <h4 className="p-3 text-center">Update your Profile</h4>
        {success && (
          <Alert text="User Profile Updated Successfully" type="success" />
        )}

        {error && <Alert text={error} type="danger" />}

        {userDetails.loading ? (
          <div className="d-flex justify-content-center">
            <SpinIcon color="black" />
          </div>
        ) : (
          <Formik
            initialValues={{
              name: userDetails.user.name,
              email: userDetails.user.email,
              password: "",
              newPassword: "",
              confirmNewPassword: "",
            }}
            validationSchema={updateAccountSchema}
            onSubmit={(values) => {
              console.log(values);
              const { name, email, password, newPassword } = values;
              dispatch(
                updateUserProfile({ name, email, password, newPassword })
              );
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
                  label="New Password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                />
                <FormGroup
                  label="New Password"
                  name="newPassword"
                  type="password"
                  placeholder="Enter password"
                />
                <FormGroup
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  type="password"
                  placeholder="Confirm your New password"
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
        )}
      </section>
    </DashboardLayout>
  );
};

export default UpdateAccount;
