import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { MdExitToApp } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import mod from "./Orghome.module.css";
import { API_URL } from "../../data/apipath";
import { LiaUsersSolid } from "react-icons/lia";
import { ImUsers } from "react-icons/im";
import Model from "react-modal";

// Set the app element for accessibility
Modal.setAppElement('#root');

const Orghome = () => {
  const [posts, setPosts] = useState([]);
  const [details, setDetails] = useState([]);
  const [applicant, setApplicant] = useState([]);
  const [visible, setVisible] = useState(false);

  Model.setAppElement('#root');

  const postHandler = async () => {
    try {
      const token = localStorage.getItem('collegeToken');
      const response = await fetch(`${API_URL}/college/myposts`, {
        method: 'GET',
        headers: {
          'token': `${token}`
        }
      });
      const newPosts = await response.json();
      setPosts(newPosts.Posts);
    } catch (error) {
      console.error(error);
    }
  };

  const getDetails = async () => {
    try {
      const token = localStorage.getItem('collegeToken');
      const response = await fetch(`${API_URL}/college/mydetails`, {
        method: 'GET',
        headers: {
          'token': `${token}`
        }
      });
      const newDetails = await response.json();
      setDetails(newDetails);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you want to delete the post");
    if (!confirm) {
      return;
    } else {
      try {
        const response = await fetch(`${API_URL}/college/deletepost/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (response.ok) {
          alert("Post deleted successfully");
          const updatedPosts = posts.filter(post => post._id !== id);
          setPosts(updatedPosts);
          window.location.reload();
        } else {
          alert("Post not deleted, try again later");
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        alert("An error occurred, please try again later");
      }
    }
  };

  const handleApplicants = async (id) => {
    try {
      const response = await fetch(`${API_URL}/college/applicants/${id}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      });
      const newApplicants = await response.json();
      setApplicant(newApplicants.Posts);
      setVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    postHandler();
    getDetails();
  }, []);

  return (
    <div className={mod.org}>
      <div className={mod.nav}>
        <div className={mod.slidebar}>
          <div className={mod.logo}>
            <h3>Welcome: {details?.Organization || "Organization"}</h3>
            <h2></h2>
          </div>
          <div className={mod.header}>
            <div className={mod.userprofile}>
              {/* <Link to="/applicant" className={mod.userprofilenotification}>
                <h3>My Applicants</h3>
                <FaBell />
              </Link> */}
              {/* <span className={mod.line}></span> */}
              <button className={mod.logouts}>
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
      {/* <hr /> */}
      <div className={mod.maincontent}>
        <br />
        <div className={mod.content}>
          <h1>My Posts</h1>
          <Link to="/addpost" className={mod.addasset}>
            Add New Post
          </Link>
          <br />
          <br />
          {posts.length === 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Experience</th>
                  <th>Designation</th>
                  <th>No. of Openings</th>
                  <th>Salary</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>No Posts found</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Experience</th>
                  <th>Designation</th>
                  <th>No. of Openings</th>
                  <th className="Salary">Salary</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((item) => (
                  <tr key={item._id}>
                    <td>{item.Branch}</td>
                    <td>{item.Experience}</td>
                    <td>{item.Designation.join(',')}</td>
                    <td>{item.Nofopenings}</td>
                    <td>{item.Salary}</td>
                    <td className={mod.options}>
                      <button className={mod.optiondelete} onClick={() => handleDelete(item._id)}>
                        <MdDeleteForever className={mod.delete} />
                      </button>
                      <button className={mod.optiondelete} onClick={() => handleApplicants(item._id)}>
                      <ImUsers  className={mod.applicants} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <Model
            isOpen={visible}
            onRequestClose={() => setVisible(false)}
            className={mod.contentss}
            style={{
              overlay: {
                zIndex: 2,
                background: 'rgba(0, 0, 0, 0.75)',
              }
            }}
          >
            <h1 style={{ color: "black" }}>My Applicants</h1>
            {applicant.length === 0 || applicant.Applicants.length === 0 ? (
              <table style={{ color: "black" }} className={mod.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Designation</th>
                    <th>Experience</th>
                    <th>Download Resume</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>No Applicants found</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Designation</th>
                    <th>Experience</th>
                    <th>Download Resume</th>
                  </tr>
                </thead>
                <tbody>
                  {applicant.Applicants.map((item) => (
                    <tr key={item._id}>
                      <td>{item.Name}</td>
                      <td>{item.email}</td>
                      <td>{item.Designation ? item.Designation.join(', ') : 'N/A'}</td>
                      <td>{item.Experience || 'N/A'}</td>
                      <td className="options">
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <button className={mod.close} onClick={() => setVisible(false)}>Close</button>
          </Model>
        </div>
      </div>
    </div>
  );
};

export default Orghome;
