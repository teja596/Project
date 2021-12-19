import React from "react";
import Navbar from "./Navbar";
import mobileIllustration from "../../assets/mobile.svg";

const AuthLayout = (props) => {
  return (
    <section>
      <Navbar />
      <section className="container-section container">
        <section className="row">
          {props.children}
          <div className="col-md-6">
            <div className="image-container d-flex align-items-center">
              <img src={mobileIllustration} alt="" />
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default AuthLayout;
