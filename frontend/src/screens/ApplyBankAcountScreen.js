import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import DashboardLayout from "../components/layout/DashboardLayout";
import FormGroup from "../components/layout/FormGroup";
import { useSelector, useDispatch } from "react-redux";
import {
  accountRegisterRequest,
  getAccountDetails,
} from "../actions/accountActions";
import Alert from "../components/layout/Alert";
import SpinIcon from "../components/layout/SpinIcon";
const ApplyBankAcountScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const accountRegister = useSelector((state) => state.accountRegister);
  const { accountInfo, loading, error } = accountRegister;

  const dispatch = useDispatch();

  const bankAccountSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .min(6, "email is too short")
      .max(50, "email is to long")
      .required("Email address required"),
    name: Yup.string()
      .min(6, "name is too short")
      .max(30, " name is too long")
      .required("name required"),
    aadharNumber: Yup.string()
      .min(12, "must be exactly 12 digits")
      .max(12, "must be exactly 12 digits")
      .required("PPS number required"),
    PIN: Yup.string()
      .min(4, "must be exactly 4 digits")
      .max(4, "must be exactly 4 digits")
      .required("PIN Number required"),
    confirmPin: Yup.string()
      .oneOf([Yup.ref("PIN"), null], "PIN  must match")
      .required("confirm PIN is required"),
  });

  return (
    <DashboardLayout>
      <section className="col-md-6 mx-auto pb-5 mt-5 ">
        <h4 className="text-center p-3">Apply For Bank Account</h4>
        {error && <Alert text={error} type="danger" />}
        {accountInfo && (
          <Alert
            text={`Account Request Submitted Successfullt  for ${userInfo.email}`}
            type="success"
          />
        )}
        <Formik
          initialValues={{
            name: userInfo.name,
            email: userInfo.email,
            aadharNumber: "",
            PIN: "",
            confirmPin: "",
          }}
          validationSchema={bankAccountSchema}
          onSubmit={(values) => {
            const { name, email, aadharNumber, PIN } = values;
            dispatch(accountRegisterRequest(name, email, aadharNumber, PIN));
          }}
        >
          {(formik) => (
            <Form noValidate>
              <FormGroup
                label="Full Name"
                type="text"
                placeholder="Enter full name"
                name="name"
                disabled={true}
              />
              <FormGroup
                label="Email Address"
                type="email"
                placeholder="Enter email address"
                name="email"
                disabled={true}
              />
              <FormGroup
                label="Aadhar Numer"
                type="number"
                placeholder="Enter pps number"
                name="aadharNumber"
              />
              <FormGroup
                label="PIN"
                type="password"
                pattern="[0-9]"
                inputMode="numeric"
                placeholder="Enter 4 digits PIN"
                name="PIN"
              />
              <FormGroup
                label="Confirm PIN"
                type="password"
                pattern="[0-9]"
                inputMode="numeric"
                placeholder="Confirm 4 digits PIN"
                name="confirmPin"
              />
              <div className="form-group">
                <button className="btn btn-primary" type="submit">
                  Apply for Account{" "}
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
      </section>
    </DashboardLayout>
  );
};

export default ApplyBankAcountScreen;

{
  /* 

{accountDetails.accountInfo.status === "pending" ? (
          <Alert
            text={`Account Creation Request pending for ${userInfo.email}`}
            type="primary"
          />
        ) : (
          <Formik
            initialValues={{
              name: userInfo.name,
              email: userInfo.email,
              aadharNumber: "",
              pin: "",
              confirmPin: "",
            }}
            validationSchema={bankAccountSchema}
            onSubmit={(values) => {
              const { name, email, aadharNumber, PIN } = values;
              dispatch(accountRegisterRequest(name, email, aadharNumber, PIN));
            }}
          >
            {(formik) => (
              <Form noValidate>
                <FormGroup
                  label="Full Name"
                  type="text"
                  placeholder="Enter full name"
                  name="name"
                  disabled={true}
                />
                <FormGroup
                  label="Email Address"
                  type="email"
                  placeholder="Enter email address"
                  name="email"
                  disabled={true}
                />
                <FormGroup
                  label="Aadhar Numer"
                  type="number"
                  placeholder="Enter aadhar number"
                  name="aadharNumber"
                />
                <FormGroup
                  label="PIN"
                  type="password"
                  pattern="[0-9]"
                  inputMode="numeric"
                  placeholder="Enter 4 digits PIN"
                  name="pin"
                />
                <FormGroup
                  label="Confirm PIN"
                  type="password"
                  pattern="[0-9]"
                  inputMode="numeric"
                  placeholder="Confirm 4 digits PIN"
                  name="confirmPin"
                />
                <div className="form-group">
                  <button className="btn btn-primary" type="submit">
                    Apply for Account
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
*/
}
