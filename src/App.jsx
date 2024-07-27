import React from "react";
import Login from "./Login";
import Organize from "./Organize";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Orghome from "./pages/Orghome";
// import Navbar from "./Components/Navbar";
import Addpost from "./pages/Addpost";
import Applicant from "./pages/Applicants/Applicant";
// import Posts from "./Homecomponents/Posts";
// import  Carousel  from "./Homecomponents/Carousel";
// import Home from "./pages/Home/Home";
// import Temp from "./Temp";

function App() {
  return (
    <div className="App">
      {/* <Home/> */}
      {/* <Carousel/> */}
      {/* <Posts/> */}
      {/* <Navbar/> */}
      {/* <Temp /> */}
      {/* <Orghome /> */}
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
