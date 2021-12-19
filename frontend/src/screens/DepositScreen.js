import React, { useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormGroup from "../components/layout/FormGroup";
import { useDispatch, useSelector } from "react-redux";
import SpinIcon from "../components/layout/SpinIcon";
import {
  transactionDeposit,
  clearTransactionDeposit,
} from "../actions/transactionActions";
import Alert from "../components/layout/Alert";
import { getAccountDetails } from "../actions/accountActions";
export const DepositScreen = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const accountDetails = useSelector((state) => state.accountDetails);
  const { accountInfo } = accountDetails;

  const transactionDepositInfo = useSelector(
    (state) => state.transactionDepositInfo
  );
  const { transactionInfo, error, loading } = transactionDepositInfo;
  const depositSchema = Yup.object({
    PIN: Yup.string()
      .min(4, "must be exactly 4 digits")
      .max(4, "must be exactly 4 digits")
      .required("PIN Number required"),
    amount: Yup.number().required("depoisit amount required"),
  });
  useEffect(() => {
    if (!accountInfo.userId) {
      dispatch(getAccountDetails(userLogin.userInfo._id));
    }
    if (transactionInfo) {
      setTimeout(() => {
        dispatch(clearTransactionDeposit());
      }, 4000);
    }
  }, [transactionInfo, accountInfo]);
  return (
    <DashboardLayout>
      <section className="col-md-6 mx-auto">
        <h4 className="text-center">Deposit Your Money Here.</h4>
        {transactionInfo && (
          <Alert type="success" text={transactionInfo.message} />
        )}
        {error && <Alert type="danger" text={error} />}
        {accountDetails.loading ? (
          <div className="d-flex justify-content-center">
            <SpinIcon color="black" />
          </div>
        ) : (
          <Formik
            initialValues={{
              accountNumber: accountInfo.accountNumber,
              PIN: "",
              amount: "",
            }}
            validationSchema={depositSchema}
            onSubmit={(values) => {
              const { amount, PIN } = values;
              dispatch(transactionDeposit(amount, PIN));
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
                  label="Deposit Amount"
                  type="number"
                  placeholder="Enter amount to deposit"
                  name="amount"
                />
                <FormGroup
                  label="PIN"
                  type="password"
                  pattern="[0-9]"
                  inputMode="numeric"
                  placeholder="Enter 4 digits PIN"
                  name="PIN"
                />
                <div className="form-group">
                  <button className="btn btn-primary" type="submit">
                    Depoit Amount
                    {loading && <SpinIcon color="white" />}
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
