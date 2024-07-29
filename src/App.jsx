import React from "react";
import Login from "./Faculty/Signup_Login/Login";
import Organize from "./Institution/Login_Signup/Organize";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Orghome from "./Institution/Home/Orghome";
import Addpost from "./Institution/AddPost/Addpost";
import Applicant from "./Institution/Applicants/Applicant";
import Home from "./Faculty/Home/Home";
import AllPosts from "./Faculty/AllPosts/AllPosts";
import Profile from "./Faculty/Profile/Profile";
import MyApplications from "./Faculty/Myapplications/MyApplications";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/Org" element={<Organize />} />
          <Route path="/myposts" element={<Orghome />} />
          <Route path="/addpost" element={<Addpost />} />
          <Route path="/applicant" element={<Applicant />} />
          <Route path="/viewall" element={<AllPosts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/applications" element={<MyApplications/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
