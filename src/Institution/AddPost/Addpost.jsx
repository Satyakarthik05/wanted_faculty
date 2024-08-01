import React, { useState,useEffect } from "react";
import mod from "../../Institution/Home/Orghome.module.css";
import style from "./Addpost.module.css";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { API_URL } from "../../data/apipath";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Model from 'react-modal';

const Addpost = () => {
  const [Designation, setDesignation] = useState([]);
  const [Branch, setBranch] = useState("");
  const [Experience, setExperience] = useState("");
  const [Nofopenings, setNofopenings] = useState("");
  const [Salary, setSalary] = useState("");
  const [Details,setDetails] =useState([]);
  const navigate = useNavigate();
  const [visible, setvisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  Model.setAppElement("#root");

  const handleDesignation = (e) => {
    const value = e.target.value;
    if (Designation.includes(value)) {
      setDesignation(Designation.filter((item) => item !== value));
    } else {
      setDesignation([...Designation, value]);
    }
  };

  const handlePost = async (e) => {
    setIsClicked(true);
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
      const showModal = () => {
        setvisible(true);
        setTimeout(() => {
          setvisible(false);
          setTimeout(() => {
            navigate('/myposts');
          }, 500); 
        }, 3000); 
      };

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        showModal();
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
        <form className={style.formss} onSubmit={handlePost}>
          <div className={style.select_branch}>
            <label htmlFor="branch" className={style.branch}>Select Branch</label>
            <select name="branch" id="branch" className={style.select} value={Branch} onChange={(e) => setBranch(e.target.value)}>
              <option value="Select Branch">Select Branch</option>
              <option value="CSE">Computer Science</option>
              <option value="ECE">Electronics</option>
              <option value="EEE">Electrical</option>
              <option value="Civil">Civil</option>
              <option value="Mechanical">Mechanical</option>
              <option value="IT">
                Information Technology
              </option>
              <option value="Metallurgy">Metallurgy</option>
              <option value="Automobile">Automobile</option>
            </select>
          </div>
          <div className={style.designations}>
            <label htmlFor="designation">Designations:</label>
            <div className={style.designation_optionss}>
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
          <button type="submit" className={style.button} disabled={isClicked}>
            Submit
          </button>
        </form>
      </div>
      <Model
          isOpen={visible}
          onRequestClose={() => setvisible(false)}
          className={style.contents}
          // overlayClassName={org.overlay}
          style={{
            overlay: {
              zIndex: 2,
              background: "rgba(0, 0, 0, 0.75)",
            },
          }}
        >
          <div className={style.card}>
      <svg className={style.wave} viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,256L11.4,240C22.9,224,46,192,69,192C91.4,192,114,224,137,234.7C160,245,183,235,206,213.3C228.6,192,251,160,274,149.3C297.1,139,320,149,343,181.3C365.7,213,389,267,411,282.7C434.3,299,457,277,480,250.7C502.9,224,526,192,549,181.3C571.4,171,594,181,617,208C640,235,663,277,686,256C708.6,235,731,149,754,122.7C777.1,96,800,128,823,165.3C845.7,203,869,245,891,224C914.3,203,937,117,960,112C982.9,107,1006,181,1029,197.3C1051.4,213,1074,171,1097,144C1120,117,1143,107,1166,133.3C1188.6,160,1211,224,1234,218.7C1257.1,213,1280,139,1303,133.3C1325.7,128,1349,192,1371,192C1394.3,192,1417,128,1429,96L1440,64L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"
          fill-opacity="1"
        ></path>
      </svg>

      <div className={style.iconContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          stroke-width="0"
          fill="currentColor"
          stroke="currentColor"
          className={style.icon}
        >
          <path
            d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
          ></path>
        </svg>
      </div>
      <div className={style.messageTextContainer}>
        <p className={style.messageText}>Success message</p>
        <p className={style.subText}>New post added successfully</p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 15 15"
        stroke-width="0"
        fill="none"
        stroke="currentColor"
        className={style.crossIcon}
        // onClick={onClose}
      >
        <path
          fill="currentColor"
          d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
          clip-rule="evenodd"
          fill-rule="evenodd"
        ></path>
      </svg>
    </div>

        </Model>
    </div>
  );
};

export default Addpost;
