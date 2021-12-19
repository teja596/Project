import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccountDetails } from "../../actions/accountActions";
import SpinIcon from "../layout/SpinIcon";
const AccountInfo = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const accountDetails = useSelector((state) => state.accountDetails);
  const { userInfo } = userLogin;
  const { accountInfo, loading } = accountDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo.accountCreated === "true") {
      dispatch(getAccountDetails(userInfo._id));
    }
  }, [userInfo]);
  return (
    <div className="col-md-6">
      <table className="table table-striped shadow">
        <tbody>
          <tr>
            <th colSpan="2" className="text-center">
              Account Details
            </th>
          </tr>
          {userInfo.accountCreated === "true" ? (
            loading ? (
              <tr>
                <td className="text-center">
                  <SpinIcon color="black" />
                </td>
              </tr>
            ) : (
              <>
                <tr>
                  <th>Account Number</th>
                  <td>{accountInfo.accountNumber}</td>
                </tr>
                <tr>
                  <th>Holder Name</th>
                  <td>{accountInfo.name}</td>
                </tr>
                <tr>
                  <th>Balence Available</th>
                  <td className="text-primary fw-bold">
                    {accountInfo.balence}
                  </td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td className="text-success">{accountInfo.status}</td>
                </tr>
              </>
            )
          ) : (
            <tr>
              <td className="text-info text-center">Account not created yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AccountInfo;
