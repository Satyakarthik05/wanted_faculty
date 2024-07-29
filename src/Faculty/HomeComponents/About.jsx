import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import "./CarouselComponent.css";
import about1 from "../../assets/about1.png";
import about2 from "../../assets/about1.webp";

const About = () => {
  return (
    <div className="container mt-5" style={{ width: '100%',background:"#DAE9EF" }}>
      <h1 style={{textAlign:"center"}}>About Us</h1>
      <div className="d-none d-md-flex flex-wrap justify-content-between" style={{marginTop:"20px"}}>
        <div className="card mb-4" style={{ flex: '0 0 45%' }}>
          <div className="card-body d-flex">
            <div className="card-text flex-grow-1">
              <h5 className="card-title">Faculty Wanted</h5>
              <p className="description">
                Faculty Wanted was born out of a need for a more cohesive
                connection between educational institutions and talented
                educators. As experienced professionals in the academic realm,
                we understood the challenges both sides faced during the hiring
                process. Our journey began with a simple vision: to create a
                platform that bridges the gap between colleges seeking faculty
                and job-seeking educators.
              </p>
            </div>
            <img src={about1} alt="About Us" className="img-fluids" />
          </div>
        </div>
        <div className="card mb-4" style={{ flex: '0 0 45%' }}>
          <div className="card-body d-flex">
            <div className="card-text flex-grow-1">
              <h5 className="card-title">Purpose and Goals</h5>
              <p className="description">
                At Faculty Wanted, our primary purpose is clear: to facilitate
                the hiring process in academia. By connecting colleges with
                passionate educators, we aim to enhance the quality of
                education by ensuring that institutions have access to
                top-tier faculty. Our goals include:
              </p>
            </div>
            <img src={about2} alt="About Us" className="img-fluids" />
          </div>
        </div>
      </div>
      <div className="d-md-none">
        <Carousel>
          <Carousel.Item>
            <div className="card mb-4">
              <div className="card-body d-flex">
                <div className="card-text flex-grow-1">
                  <h5 className="card-title">About Us</h5>
                  <p className="description">
                    Faculty Wanted was born out of a need for a more cohesive
                    connection between educational institutions and talented
                    educators. As experienced professionals in the academic realm,
                    we understood the challenges both sides faced during the hiring
                    process. Our journey began with a simple vision: to create a
                    platform that bridges the gap between colleges seeking faculty
                    and job-seeking educators.
                  </p>
                </div>
                <img src={about1} alt="About Us" className="img-fluids" style={{height:"100px" , width:"100px"}} />
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="card mb-4">
              <div className="card-body d-flex">
                <div className="card-text flex-grow-1">
                  <h5 className="card-title">Purpose and Goals</h5>
                  <p className="description">
                    At Faculty Wanted, our primary purpose is clear: to facilitate
                    the hiring process in academia. By connecting colleges with
                    passionate educators, we aim to enhance the quality of
                    education by ensuring that institutions have access to
                    top-tier faculty. Our goals include:
                  </p>
                </div>
                <img src={about2} alt="About Us" className="img-fluids" />
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default About;
