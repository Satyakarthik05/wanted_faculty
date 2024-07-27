import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import Banner from "./Banners/Banner";
import Banner2 from "./Banners/Banner2";
import Banner3 from "./Banners/Banner3";

function App() {
  return (
    <div className="App">
      <br />
      <Carousel interval={3000} className="container">
        <Carousel.Item>
          {/* <img className="d-block w-100" src="image1.jpg" alt="First slide" /> */}
          <Banner />
        </Carousel.Item>
        <Carousel.Item>
          {/* <img className="d-block w-100" src="image2.jpg" alt="Second slide" /> */}
          <Banner2 />
        </Carousel.Item>
        <Carousel.Item>
          {/* <img className="d-block w-100" src="image3.jpg" alt="Third slide" /> */}
          <Banner3 />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default App;
