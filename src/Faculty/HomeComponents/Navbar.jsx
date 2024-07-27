import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import logo from "../../assets/logo.png"

const Navbar = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "var(--nudepink)" }}
      >
        <div className="container-fluid">
          <div className="d-flex ">
            <a className="navbar-brand" href="#">
              <img
                src={logo}
                alt=""
                width="40"
                height="30"
                style={{borderRadius:"20px"}}
              />
            </a>
            <a className="navbar-brand" href="#">
              <h3>Faculty</h3>
            </a>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse text-center text-lg-start"
            id="navbarText"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  <h5>Home</h5>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <h5>My applications</h5>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <h5>Profile</h5>
                </a>
              </li>
              <li className="nav-item">
                <button className="btn btn-success">LOGIN/SIGNUP</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
