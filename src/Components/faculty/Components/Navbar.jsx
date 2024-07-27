import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
const Navbar = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg "
        style={{ backgroundColor: "var(--nudepink)" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand " href="#">
            <h3>Facuilty</h3>
          </a>
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
                  <h5>Features</h5>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <h5>Pricing</h5>
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
