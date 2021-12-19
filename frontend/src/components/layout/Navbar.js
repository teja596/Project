import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a
          className="navbar-brand fw-bold d-flex align-items-center gap-2"
          href="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M2 20h20v2H2v-2zm2-8h2v7H4v-7zm5 0h2v7H9v-7zm4 0h2v7h-2v-7zm5 0h2v7h-2v-7zM2 7l10-5 10 5v4H2V7zm2 1.236V9h16v-.764l-8-4-8 4zM12 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
              fill="rgba(11,94,215,1)"
            />
          </svg>{" "}
          Secure-Trans ATM
        </a>

        <ul className=" navbar-nav mr-auto">
          <li className="nav-item ">
            <Link className="nav-link " to="/">
              Home
            </Link>
          </li>
          <li className="nav-item mx-4">
            <Link className=" btn btn-primary" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="btn btn-outline-dark " to="/signup">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
