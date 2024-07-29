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
import style from '../AddPost/Addpost.module.css'

// Set the app element for accessibility
Modal.setAppElement('#root');

const Orghome = () => {
  const [posts, setPosts] = useState([]);
  const [details, setDetails] = useState([]);
  const [applicant, setApplicant] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibledelete,setVisibledelete] = useState(false);
  const [deleteId,setdeleteId] = useState("");
  const [successDelete,setSuccessdelete]=useState(false);
  const [isLoading, setIsLoading] = useState(true);

  Model.setAppElement('#root');

  const closeDelete = ()=>{
    setVisibledelete(false);
  }

  const handleDeleteId=(id)=>{
    setdeleteId(id);
    setVisibledelete(true);
  }

  const postHandler = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const getDetails = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleDelete = async () => {
    if (!deleteId) return;
  
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/college/deletepost/${deleteId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        const data = await response.json();
        setPosts(posts.filter(post => post._id !== deleteId));
        setVisibledelete(false);
        setSuccessdelete(true);
        setTimeout(() => {
          setSuccessdelete(false);
        }, 3000); 
      } else {
        alert("Post not deleted, try again later");
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert("An error occurred, please try again later");
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleApplicants = async (id) => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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
      <div className={mod.maincontent}>
        <br />
        <div className={mod.content}>
          <h1>My Posts</h1>
          <Link to="/addpost" className={mod.addasset}>
            Add New Post
          </Link>
          <br />
          <br />
          {isLoading && <div className="loader"></div>}
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
                      <button className={mod.optiondeletes} onClick={() => handleDeleteId(item._id)} >
                        <MdDeleteForever className={mod.delete} />
                      </button>
                      <button className={mod.optiondeletes} onClick={() => handleApplicants(item._id)}>
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
                      <td className={mod.resume}>
                        <a href={item.Resume} download>
                          <button className={mod.download}>
                            <span className={mod.downloadicon}><MdEdit/></span>
                            <span>Download</span>
                          </button>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <button className="btn btn-danger" onClick={()=> setVisible(false)} style={{width:"70px",marginTop:"20px"}}>Close</button>
          </Model>

          <div className={mod.deletepost}>
          <Model
            isOpen={visibledelete}
            onRequestClose={setVisibledelete}
            className={mod.deleteMod}
            style={{
              overlay: {
                zIndex: 2,
                background: 'rgba(0, 0, 0, 0.75)',
              }
            }}
          >
            <h1 style={{ color: "black" }}>Delete Post</h1>
            <div style={{ color: "black" }}>Are you sure you want to delete this post?</div>
            <div className={mod.deleteBtn}>
              <button className={mod.yes} onClick={handleDelete}>Yes</button>
              <button className={mod.no} onClick={closeDelete}>No</button>
            </div>
          </Model>
          </div>
        </div>
      </div>
      <Model 
       isOpen={successDelete}
       onRequestClose={setSuccessdelete}
       className={mod.successDelete}
       style={{
         overlay: {
           zIndex: 2,
           background: 'rgba(0, 0, 0, 0.75)',
         }
       }}>
      {successDelete && (
              <div style={{ color: "green" }}>Post deleted successfully!</div>
            )}
      </Model>
    </div>
  );
}

export default Orghome;
