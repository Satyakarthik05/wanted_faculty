import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Button } from 'react-bootstrap';
import { API_URL } from '../../data/apipath';
import './Post.css';
import card from '../../assets/card.jpg';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [selectBranch, setSelectBranch] = useState("");

  const postHandler = async (e) => {
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

  useEffect(() => {
    postHandler();
  }, [selectBranch]);
  const navigate = useNavigate();

  const renderCarouselItems = () => {
    const items = [];
    for (let i = 0; i < posts.length; i += 2) {
      items.push(
        <Carousel.Item key={i}>
          <div className="row">
            {posts.slice(i, i + 2).map(post => (
              <div key={post._id} className="col-lg-6 col-sm-12 mb-4">
                <div className="card" style={{ boxShadow: '0px 3px 15px rgba(40, 44, 49, 0.5)', borderRadius: '10px',height:'auto' }}>
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
                          <h1>{post.Organization}</h1>
                        </h2>
                        <h5 className="card-subtitle mb-2 text-muted">Branch: {post.Branch}</h5>
                        <p className="card-text"><b>Experience: {post.Experience}</b></p>
                        <p className="card-text"><b>Designation: {post.Designation.join(',')}</b></p>
                        <p className="card-text"><b>No of Openings: {post.Nofopenings}</b></p>
                        <p className="card-text"><b>Address: {post.Salary}</b></p>
                        <p className="card-text"><b>Website: <a href="">visit</a></b></p>
                        <p className="card-text"><b>Salary: {post.Salary}</b></p>
                        <button>Apply</button>
                        {/* <a href="#" className="btn btn-primary">Apply</a> */}
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
        <h2 style={{textAlign:"center"}}>New Posts</h2>
      </div>
      <div className="container posts" style={{ marginTop: "20px" }}>
        <Carousel>
          {renderCarouselItems()}
        </Carousel>
        <div className="text-center mt-4">
          <Button onClick={()=> navigate('viewall')} style={{width:"200px"}}>
            View All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Posts;
