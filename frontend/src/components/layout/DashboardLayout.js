import React from "react";
import DashboardNavbar from "./DashboardNavbar";

const DashboardLayout = (props) => {
  return (
    <section className="container-fluid">
      <section className="row">
        <DashboardNavbar />
        <div className="col-md-10 py-3 ">{props.children}</div>
      </section>
    </section>
  );
};

export default DashboardLayout;
