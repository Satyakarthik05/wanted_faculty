import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CarouselComponent.css';  // Import the custom CSS file

const CarouselComponent = () => {
  return (
    <div className="container my-5">
      <Carousel interval={3000} className="custom-carousel">
        <Carousel.Item>
          <div className="d-flex justify-content-center custom-carousel-inner">
            <div className="card custom-card mx-2">
              <div className="card-body custom-card-body">
                <h5 className="card-title">About Us 1</h5>
                <p className="card-text">Description about us 1</p>
              </div>
              <img src="https://via.placeholder.com/150" className="card-img-bottom custom-card-img" alt="Car 1" />
            </div>
            <div className="card custom-card mx-2">
              <div className="card-body custom-card-body">
                <h5 className="card-title">About Us 2</h5>
                <p className="card-text">Description about us 2</p>
              </div>
              <img src="https://via.placeholder.com/150" className="card-img-bottom custom-card-img" alt="Car 2" />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex justify-content-center custom-carousel-inner">
            <div className="card custom-card mx-2">
              <div className="card-body custom-card-body">
                <h5 className="card-title">About Us 3</h5>
                <p className="card-text">Description about us 3</p>
              </div>
              <img src="https://via.placeholder.com/150" className="card-img-bottom custom-card-img" alt="Car 3" />
            </div>
            <div className="card custom-card mx-2">
              <div className="card-body custom-card-body">
                <h5 className="card-title">About Us 4</h5>
                <p className="card-text">Description about us 4</p>
              </div>
              <img src="https://via.placeholder.com/150" className="card-img-bottom custom-card-img" alt="Car 4" />
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
