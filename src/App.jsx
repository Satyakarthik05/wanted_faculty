import React from "react";
import Login from "./Faculty/Signup_Login/Login";
import Organize from "./Institution/Login_Signup/Organize";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Orghome from "./Institution/Home/Orghome";
import Addpost from "./Institution/AddPost/Addpost";
import Applicant from "./Institution/Applicants/Applicant";
import Navbar from "./Faculty/HomeComponents/Navbar";
import Carousel from "./Faculty/HomeComponents/Carousel";
import Posts from "./Faculty/HomeComponents/Posts";


function App() {
  return (
    <div className="App">
      {/* <Navbar/>
      <Carousel/>
      <Posts/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Org" element={<Organize />} />
          <Route path="/myposts" element={<Orghome />} />
          <Route path="/addpost" element={<Addpost />} />
          <Route path="/applicant" element={<Applicant />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
