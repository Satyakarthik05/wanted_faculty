import React from "react";
import mod from "./Orghome.module.css";
import { MdExitToApp } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { Link } from "react-router-dom";

const Orghome = () => {
  return (
    <div className={mod.org}>
      <div className={mod.slidebar}>
        <div className={mod.logo}>
          <h2>Welcome Organization name</h2>
        </div>
        <div className={mod.header}>
          <div className={mod.userprofile}>
            <span className={mod.userprofilenotification}>
              <FaBell />
            </span>
            <span className={mod.line}></span>
            <button className={mod.logout}>
              <Link to="/">
                <span>Logout</span>
                <span>
                  <MdExitToApp />
                </span>
              </Link>
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className={mod.maincontent}>
        <div className={mod.content}>
          <h1>My Posts</h1>
          <button className={mod.addasset}>Add New Asset</button>
          <table>
            <thead>
              <tr>
                {/* <th>Asset ID</th> */}
                <th>Department</th>
                <th>Experience</th>
                <th>Designation</th>
                <th>No. of Openings</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td>83-4546</td> */}
                <td>CSM</td>
                <td>2 years</td>
                <td>UG</td>
                <td>10</td>
                <td>
                  <button>Edit</button> <button>Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orghome;
