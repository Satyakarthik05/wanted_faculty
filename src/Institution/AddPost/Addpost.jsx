import React, { useState,useEffect } from "react";
import mod from "../../Institution/Home/Orghome.module.css";
import style from "./Addpost.module.css";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { API_URL } from "../../data/apipath";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Addpost = () => {
  const [Designation, setDesignation] = useState([]);
  const [Branch, setBranch] = useState("");
  const [Experience, setExperience] = useState("");
  const [Nofopenings, setNofopenings] = useState("");
  const [Salary, setSalary] = useState("");
  const [Details,setDetails] =useState([]);
  const navigate = useNavigate();

  const handleDesignation = (e) => {
    const value = e.target.value;
    if (Designation.includes(value)) {
      setDesignation(Designation.filter((item) => item !== value));
    } else {
      setDesignation([...Designation, value]);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const Token = localStorage.getItem("collegeToken");

    try {
      const response = await fetch(`${API_URL}/college/collegeposts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `${Token}`,
        },
        body: JSON.stringify({
          Branch,
          Designation,
          Experience,
          Nofopenings,
          Salary,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert("New post posted successfully");
        navigate('/myposts')
      } else {
        alert("New post not added");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDetails = async (e)=> {
    try {
      const token = localStorage.getItem('collegeToken');
      const response = await fetch(`${API_URL}/college/mydetails`, {
        method: 'GET',
        headers: {
          'token': `${token}`
        }
      });
      const newPosts = await response.json();
      setDetails(newPosts);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDetails();
    // console.log("this is useeffect")
  }, []);

  return (
    <div>
      <div className={mod.nav}>
        <div className={mod.slidebar}>
          <div className={mod.logo}>
            <Link to="/myposts" style={{ color: "white" }} className={mod.backarrowss}>
              <FaArrowLeft className={mod.backarrows} />
            </Link>
            <h3>Welcome :{Details ?.Organization || "Organization"}</h3>
            <h2></h2>
          </div>
          <div className={mod.header}>
            <div className={mod.userprofile}>
              {/* <Link to="/applicants" className={mod.userprofilenotification}>
                <FaBell />
              </Link> */}
              <span className={mod.line}></span>
              <button className={mod.logout}>
                <Link to="/">
                  <span>Logout</span>
                  <span className={mod.logouticon}>
                    <MdExitToApp />
                  </span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={style.formbox}>
        <h1 style={{ marginTop: "10px", marginLeft: "10px", color: "white" }}>
          Add details
        </h1>
        <br />
        <br />
        <form className={style.form} onSubmit={handlePost}>
          <div className={style.select_branch}>
            <label htmlFor="branch" className={style.branch}>Select Branch</label>
            <select name="branch" id="branch" className={style.select} value={Branch} onChange={(e) => setBranch(e.target.value)}>
              <option value="Computer Science">Computer Science</option>
              <option value="Electronics">Electronics</option>
              <option value="Electrical">Electrical</option>
              <option value="Civil">Civil</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Metallurgy">Metallurgy</option>
              <option value="Automobile">Automobile</option>
            </select>
          </div>
          <div className={style.designation}>
            <label htmlFor="designation">Designations:</label>
            <div className={style.designation_options}>
              <label htmlFor="UG">UG</label>
              <input
                type="checkbox"
                name="UG"
                id="UG"
                checked={Designation.includes("UG")}
                value="UG"
                onChange={handleDesignation}
              />
              <label htmlFor="PG">PG</label>
              <input
                type="checkbox"
                name="PG"
                id="PG"
                checked={Designation.includes("PG")}
                value="PG"
                onChange={handleDesignation}
              />
              <label htmlFor="PHD">PHD</label>
              <input
                type="checkbox"
                name="PHD"
                id="PHD"
                checked={Designation.includes("PHD")}
                value="PHD"
                onChange={handleDesignation}
              />
            </div>
          </div>
          <span className={style.inputborder}></span>
          <input
            className={style.input}
            placeholder="Experience, ex-2years"
            required
            type="text"
            value={Experience}
            onChange={(e) => setExperience(e.target.value)}
          />
          <span className={style.inputborder}></span>
          <input
            className={style.input}
            placeholder="No of openings"
            required
            type="text"
            value={Nofopenings}
            onChange={(e) => setNofopenings(e.target.value)}
          />
          <span className={style.inputborder}></span>
          <input
            className={style.input}
            placeholder="Salary"
            required
            type="text"
            value={Salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <span className={style.inputborder}></span>
          <button type="submit" className={style.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addpost;
