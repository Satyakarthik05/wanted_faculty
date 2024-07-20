// src/Navbar.js
import React, { useState } from "react";
import "./Temp.css";

const Temp = () => {
  const [active, setActive] = useState("home");

  return (
    <div className="navbar">
      <div
        className={`nav-item ${active === "home" ? "active" : ""}`}
        onClick={() => setActive("home")}
      >
        Home
      </div>
      <div
        className={`nav-item ${active === "about" ? "active" : ""}`}
        onClick={() => setActive("about")}
      >
        About
      </div>
      <div className={`underline ${active}`}></div>
    </div>
  );
};

export default Temp;
