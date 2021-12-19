import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormGroup from "../components/layout/FormGroup";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import SpinIcon from "../components/layout/SpinIcon";
import Alert from "../components/layout/Alert";

import {
  accountPINUpdateRequest,
  getAccountDetails,
  accoutPINDetailsClear,
} from "../actions/accountActions";
const UpdatePINScreen = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const accountDetails = useSelector((state) => state.accountDetails);
  const { accountInfo } = accountDetails;

  const accountPINUpdateDetails = useSelector(
    (state) => state.accountPINUpdateDetails
  );

  const { accountPINDetails, error, loading } = accountPINUpdateDetails;
  const updatePINSchema = Yup.object({
    PIN: Yup.string()
      .min(4, "must be exactly 4 digits")
      .max(4, "must be exactly 4 digits")
      .required("PIN Number required"),
    newPIN: Yup.string()
      .min(4, "must be exactly 4 digits")
      .max(4, "must be exactly 4 digits")
      .required("new PIN Number required"),
    confirmNewPin: Yup.string()
      .oneOf([Yup.ref("newPIN"), null], "PIN number must match")
      .required("confirm PIN required"),
  });

  useEffect(() => {
    if (!accountInfo.userId) {
      dispatch(getAccountDetails(userLogin.userInfo._id));
    }

    if (accountPINDetails) {
      setTimeout(() => {
        dispatch(accoutPINDetailsClear());
      }, 4000);
    }
  }, [accountInfo, accountPINDetails, dispatch]);
  return (
    <DashboardLayout>
      <section className="col-md-6 mx-auto">
        <h4 className="p-3 text-center">Update your PIN Number</h4>
        {accountPINDetails && (
          <Alert text={accountPINDetails.message} type="success" />
        )}
        {error && <Alert text={error} type="danger" />}
        {accountDetails.loading ? (
          <div className="d-flex justify-content-center">
            <SpinIcon color="black" />
          </div>
        ) : (
          <Formik
            initialValues={{
              accountNumber: accountInfo.accountNumber,
              email: userInfo.email,
              pin: "",
              newPin: "",
              confirmNewPin: "",
            }}
            validationSchema={updatePINSchema}
            onSubmit={(values) => {
              const { PIN, newPIN } = values;
              dispatch(accountPINUpdateRequest(PIN, newPIN, accountInfo._id));
            }}
          >
            {(formik) => (
              <Form noValidate>
                <FormGroup
                  label="Account Number"
                  type="text"
                  name="accountNumber"
                  disabled={true}
                />
                <FormGroup
                  label="Email Address"
                  type="email"
                  name="email"
                  disabled={true}
                />
                <FormGroup
                  label="PIN"
                  type="password"
                  placeholder="Enter PIN Number"
                  name="PIN"
                />
                <FormGroup
                  label="New PIN"
                  type="password"
                  placeholder="Enter 4 digits new PIN"
                  name="newPIN"
                />
                <FormGroup
                  label="Confirm New PIN"
                  type="password"
                  placeholder="Confirm new PIN"
                  name="confirmNewPin"
                />
                <div className="form-group">
                  <button className="btn btn-primary" type="submit">
                    Depoit Amount {loading && <SpinIcon color="white" />}
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

export default UpdatePINScreen;
