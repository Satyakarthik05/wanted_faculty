import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL } from '../../data/apipath';
// import './AllPosts.css';
import card from '../../assets/card.jpg';
import Navbar from '../HomeComponents/Navbar';
import { useNavigate } from 'react-router-dom';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const postHandler = async () => {
      const token = localStorage.getItem('loginToken');
        try {
            const response = await fetch(`${API_URL}/faculty/myapplications`, {
                method: 'GET',
                headers: {
                    'token': `${token}`
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
    }, []);

    return (
        <div className="AllPostss">
            <Navbar />
            <div className="container posts" style={{ marginTop: "20px" }}>
                <div className="row">
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <div key={post._id} className="col-lg-4 col-sm-12 col-md-4 mb-4">
                                <div className="card" style={{ boxShadow: '0px 3px 15px rgba(40, 44, 49, 0.5)', borderRadius: '10px', height: "auto" }}>
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
                                                <h2 className="card-title"><marquee behavior="" direction="">{post.Organization}</marquee></h2>
                                                <h5 className="card-subtitle mb-2 text-muted">Branch: {post.Branch}</h5>
                                                <p className="card-text"><b>Experience: {post.Experience}</b></p>
                                                <p className="card-text"><b>Designation: {post.Designation}</b></p>
                                                <p className="card-text"><b>No of Openings: {post.Nofopenings}</b></p>
                                                <p className="card-text"><b>Address-city: {post.address}</b></p>
                                                <p className="card-text"><b>College-Url: <a href={post.link}>Website</a></b></p>
                                                <p className="card-text"><b>Salary: {post.Salary}</b></p>
                                                <button>Status: Pending</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No posts available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllPosts;
