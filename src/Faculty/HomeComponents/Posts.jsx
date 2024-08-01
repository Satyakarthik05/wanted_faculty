import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Button } from 'react-bootstrap';
import { API_URL } from '../../data/apipath';
import './Post.css';
import card from '../../assets/card.jpg';
import Model from 'react-modal';
import mod from '../../Institution/Home/Orghome.module.css';
import { useNavigate } from 'react-router-dom';
import style from "../../Institution/AddPost/Addpost.module.css"

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [selectBranch, setSelectBranch] = useState("");
  const [faculty, setFaculty] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmApply, setConfirmApply] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [success,setsuccess]= useState(false);
  const navigate = useNavigate();

  const postHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/faculty/postFilter/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.log("Posts not found");
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const getFaculty = async () => {
    const token = localStorage.getItem('loginToken');
    try {
      const response = await fetch(`${API_URL}/faculty/mydetails`, {
        method: "GET",
        headers: {
          'token': `${token}`
        },
      });
      if (!response.ok) {
        console.log("No faculty found");
      }

      const data = await response.json();
      setFaculty(data);

    } catch (error) {
      console.error(error);
    }
  }

  const handleToken = (post) => {
    const token = localStorage.getItem('loginToken');
    if (!token) {
      setVisible(true);
      return null;
    } else if (!faculty || !faculty.Resume) {
      navigate('/profile')
      return null;
    } else {
      setSelectedPost(post);
      setConfirmApply(true);
    }
  };

  const ApplyPost = async () => {
    if (!selectedPost) return;
    setConfirmApply(false);

    const token = localStorage.getItem('loginToken');
    try {
      const response = await fetch(`${API_URL}/apply/application`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": `${token}`
        },
        body: JSON.stringify({ Organization: selectedPost.Organization, postId: selectedPost._id })
      });
      const result = await response.json();
      if (response.ok) {
        // alert("Applied Successfully");
        setsuccess(true);
        setTimeout(()=> {
          setsuccess(false)
        },3000)
      } else {
        alert("Error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSelectedPost(null);
    }
  }

  useEffect(() => {
    postHandler();
    getFaculty();
  }, [selectBranch]);

  const renderCarouselItems = () => {
    const items = [];
    for (let i = 0; i < posts.length; i += 2) {
      items.push(
        <Carousel.Item key={i}>
          <div className="row">
            {posts.slice(i, i + 2).map(post => (
              <div key={post._id} className="col-lg-6 col-sm-12 mb-4">
                <div className="card" style={{ boxShadow: '0px 3px 15px rgba(40, 44, 49, 0.5)', borderRadius: '10px', height: 'auto' }}>
                  <div className="row no-gutters">
                    <div className="col-auto">
                      <img
                        src={card || 'default-image-url.jpg'}
                        alt="college"
                        style={{ width: '100px', height: '100px', borderRadius: '10px', margin: '10px' }}
                      />
                    </div>
                    <div className="col">
                      <div className="card-body">
                        <h2 className="card-title">
                          <h1><marquee behavior="" direction="">{post.Organization}</marquee></h1>
                        </h2>
                        <h5 className="card-subtitle mb-2 text-muted">Branch: {post.Branch}</h5>
                        <p className="card-text"><b>Experience: {post.Experience}</b></p>
                        <p className="card-text"><b>Designation: {post.Designation.join(', ')}</b></p>
                        <p className="card-text"><b>No of Openings: {post.Nofopenings}</b></p>
                        {post.College && post.College.length > 0 && (
                          <>
                            <p className="card-text"><b>Address: {post.College[0].address}</b></p>
                            <p className="card-text"><b>Website: <a href={post.College[0].link}>visit</a></b></p>
                          </>
                        )}
                        <p className="card-text"><b>Salary: {post.Salary}</b></p>
                        <button onClick={() => handleToken(post)}>Apply</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Carousel.Item>
      );
    }
    return items;
  };

  return (
    <div className="AllPosts">
      <div className="Filter_Branch">
        <h2 style={{ textAlign: "center" }}>New Posts</h2>
      </div>
      <div className="container posts" style={{ marginTop: "20px" }}>
        <Carousel>
          {renderCarouselItems()}
        </Carousel>
        <div className="text-center mt-4">
          <Button onClick={() => navigate('viewall')} style={{ width: "200px" }}>
            View All
          </Button>
        </div>
      </div>
      <Model
        isOpen={visible}
        onRequestClose={() => setVisible(false)}
        className={mod.deleteMod}
        style={{
          overlay: {
            zIndex: 2,
            background: 'rgba(0, 0, 0, 0.75)',
          }
        }}
      >
        <h1 style={{ color: "black" }}>Confirm login</h1>
        <div style={{ color: "black" }}>To apply the post you have to login</div>
        <div className={mod.deleteBtn} style={{ marginTop: "20px" }}>
          <button className={mod.yes} onClick={() => navigate('/login')} style={{ width: "auto", height: "40px" }}>Login</button>
          <button className={mod.no} onClick={() => setVisible(false)} style={{ width: "auto", height: "40px" }}>Stay here</button>
        </div>
      </Model>
      <Model
        isOpen={confirmApply}
        onRequestClose={() => setConfirmApply(false)}
        className={mod.deleteMod}
        style={{
          overlay: {
            zIndex: 2,
            background: 'rgba(0, 0, 0, 0.75)',
          }
        }}
      >
        <h1 style={{ color: "black" }}>Confirmation message</h1>
        <div style={{ color: "black" }}>Confirm you want to apply for the college</div>
        <div className={mod.deleteBtn} style={{ marginTop: "20px" }}>
          <button className={mod.yes} style={{ width: "auto", height: "40px" }} onClick={ApplyPost}>Yes</button>
          <button className={mod.no} onClick={() => setConfirmApply(false)} style={{ width: "auto", height: "40px" }}>No</button>
        </div>
      </Model>
      <Model
          isOpen={success}
          onRequestClose={() => setsuccess(false)}
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
        <p className={style.subText}>Your Application submitted Successfully</p>
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

export default Posts;
