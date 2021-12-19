import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../actions/userActions";
import SpinIcon from "../layout/SpinIcon";
const UserInfo = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading } = userDetails;

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  return (
    <div className="col-md-6">
      <table className="table table-striped shadow">
        <tbody>
          <tr>
            <th colSpan="2" className="text-center">
              Personal Details
            </th>
          </tr>
          {loading ? (
            <tr>
              <td className="text-center">
                <SpinIcon color="black" />
              </td>
            </tr>
          ) : (
            <>
              <tr>
                <th>Full Name</th>
                <td>{user.name}</td>
              </tr>
              <tr>
                <th>Email Address</th>
                <td>{user.email}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserInfo;
