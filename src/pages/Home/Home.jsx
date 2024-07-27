import React from 'react'
import  Carousel  from '../../Homecomponents/Carousel';
import Navbar from '../../Homecomponents/Navbar';
import Posts from '../../Homecomponents/Posts';

const Home = () => {
  return (
    <div>
      <div className="nav">
        <Navbar/>
      </div>
      <div ><Carousel/></div>
      <div>
      <Posts/>
      </div>
      
    </div>
  )
}

export default Home
