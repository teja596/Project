import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../actions/transactionActions";
import DashboardLayout from "../components/layout/DashboardLayout";
import SpinIcon from "../components/layout/SpinIcon";
const Statement = () => {
  const dispatch = useDispatch();
  const transactionList = useSelector((state) => state.transactionList);
  const { loading, error, transactions } = transactionList;
  console.log(transactions);
  useEffect(() => {
    dispatch(getTransactions());
  }, []);
  return (
    <DashboardLayout>
      <section className="container">
        <h4 className="text-center text-primary">Account Statement</h4>
        <div className="d-flex align-items-center justify-content-end">
          <span className="px-2">sort by Latest Date</span>
          <input type="checkbox" name="" id="" />
        </div>
        {loading ? (
          <div className="d-flex justify-content-center">
            <SpinIcon color="black" />
          </div>
        ) : (
          <table className="table table-striped mt-3 text-center">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Account Number</th>
                <th>Transaction Type</th>
                <th>Amount</th>
                <th>Balence</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{`${new Date(item.updatedAt).getDate()}-${new Date(
                      item.updatedAt
                    ).getMonth()}-${new Date(
                      item.updatedAt
                    ).getFullYear()} `}</td>
                    <td>{item.accountNumber}</td>
                    <td
                      className={
                        item.type === "Deposit" ? "text-success" : "text-danger"
                      }
                    >
                      {item.type}
                    </td>
                    <td
                      className={item.type === "Deposit" ? "" : "text-danger"}
                    >
                      {item.amount}
                    </td>
                    <td className="text-success fw-bold">{item.balence}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </DashboardLayout>
  );
};

export default Statement;
