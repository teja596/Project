import React, { useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormGroup from "../components/layout/FormGroup";
import SpinIcon from "../components/layout/SpinIcon";
import { useDispatch, useSelector } from "react-redux";
import { getAccountDetails } from "../actions/accountActions";
import Alert from "../components/layout/Alert";
import {
  transactionWithdrawl,
  clearTransactionWithdrawl,
} from "../actions/transactionActions";
const WithdrawlScreen = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const accountDetails = useSelector((state) => state.accountDetails);
  const { accountInfo } = accountDetails;

  const transactionWithdrawlInfo = useSelector(
    (state) => state.transactionWithdrawlInfo
  );
  const { transactionInfo, error, loading } = transactionWithdrawlInfo;
  const depositSchema = Yup.object({
    PIN: Yup.string()
      .min(4, "must be exactly 4 digits")
      .max(4, "must be exactly 4 digits")
      .required("PIN Number required"),
    amount: Yup.number().required("withdrawl amount required"),
  });

  useEffect(() => {
    if (!accountInfo.userId) {
      dispatch(getAccountDetails(userLogin.userInfo._id));
    }
    if (transactionInfo) {
      setTimeout(() => {
        dispatch(clearTransactionWithdrawl());
      }, 4000);
    }
  }, [transactionInfo, accountInfo]);
  return (
    <DashboardLayout>
      <section className="col-md-6 mx-auto">
        <h4 className="text-center">Withdrawl Your Money Here.</h4>
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
              console.log(values);
              const { amount, PIN } = values;
              dispatch(transactionWithdrawl(amount, PIN));
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
                  label="Withdrawl Amount"
                  type="number"
                  placeholder="Enter amount to withdrawl"
                  name="amount"
                />
                <FormGroup
                  label="PIN"
                  type="password"
                  placeholder="Enter 4 digits PIN"
                  name="PIN"
                  pattern="[0-9]"
                  inputMode="numeric"
                />
                <div className="form-group">
                  <button className="btn btn-primary" type="submit">
                    Withdraw Amount {loading && <SpinIcon color="white" />}
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

export default WithdrawlScreen;
