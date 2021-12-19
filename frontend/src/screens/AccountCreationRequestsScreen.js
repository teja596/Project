import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccounts, accountUpdateRequest } from "../actions/accountActions";
import DashboardLayout from "../components/layout/DashboardLayout";
import Alert from "../components/layout/Alert";
import SpinIcon from "../components/layout/SpinIcon";
const AccountCreationRequestsScreen = () => {
  const [accountId, setAccountId] = useState("");

  const dispatch = useDispatch();
  const accountsDetails = useSelector((state) => state.accountsDetails);
  const { accountDetails, loading, error } = accountsDetails;

  //for account approvel
  const accountUpdateDetails = useSelector(
    (state) => state.accountUpdateDetails
  );

  useEffect(() => {
    dispatch(getAccounts());
  }, [accountUpdateDetails.accountDetails]);

  const handleApproveAccountRequest = (id, userId) => {
    setAccountId(id);
    dispatch(accountUpdateRequest(id, userId));
  };

  const pendingAccountList = () => {
    return accountDetails.map((item, index) => {
      return (
        <tr key={item._id}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.aadharNumber}</td>
          <td
            className={
              item.status === "active" ? "text-success fw-bold" : "text-info"
            }
          >
            {item.status}
          </td>
          <td>
            {item.status !== "active" ? (
              <div className="d-flex justify-content-evenly">
                <button
                  className="btn btn-sm btn-primary mr-2"
                  onClick={() =>
                    handleApproveAccountRequest(item._id, item.userId)
                  }
                >
                  approve
                  {accountUpdateDetails.loading && accountId === item._id && (
                    <SpinIcon color="white" />
                  )}
                </button>
                <button className="btn btn-sm btn-danger"> cancel </button>
              </div>
            ) : (
              <p className="text-center">----</p>
            )}
          </td>
        </tr>
      );
    });
  };
  return (
    <DashboardLayout>
      <section className="container">
        <h4 className="text-center p-3">Account Creation Requests</h4>

        {accountUpdateDetails.error && (
          <Alert text={accountUpdateDetails.error} type="danger" />
        )}
        {error && <Alert text={error} type="danger" />}
        {loading ? (
          <div className="d-flex justify-content-center">
            <SpinIcon color="black " />
          </div>
        ) : (
          <table className="table table-striped text-center">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Aadhar Number</th>
                <th>status</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>{pendingAccountList()}</tbody>
          </table>
        )}
      </section>
    </DashboardLayout>
  );
};

export default AccountCreationRequestsScreen;
