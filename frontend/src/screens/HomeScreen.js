import React from "react";
import Navbar from "../components/layout/Navbar";
import landing from "../assets/landing.svg";
const HomeScreen = () => {
  return (
    <section>
      <Navbar />
      <section className="container-section container py-5">
        <div className="row">
          <div className="col-md-6">
            <h4 className="text-uppercase my-3">
              <span className="badge bg-primary">
                Your Security our Promise.
              </span>
            </h4>
            <h1 className="fs-1">
              We Provide you the most secure service to do online{" "}
              <span className="text-primary">transcations</span>.
            </h1>
            <p className="text-secondary mt-3 mb-5 fs-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              ducimus possimus fuga iusto id porro veniam amet modi velit
              dolorum? Lorem ipsum dolor sit.
            </p>

            <div className="d-flex gap-2 ">
              <button className="btn btn-outline-primary">
                Crate an account
              </button>
              <button className="btn btn-dark">Contact</button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="image-container">
              <img src={landing} alt="" />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default HomeScreen;
