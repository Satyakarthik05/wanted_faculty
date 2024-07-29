import React from 'react'
import Navbar from '../HomeComponents/Navbar';
import Carousel from '../HomeComponents/Carousel';
import Posts from '../HomeComponents/Posts';
import About from '../HomeComponents/About';
import Footer from '../HomeComponents/Footer';

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Carousel/>
        <Posts/>
        <About/>
        <Footer/>
      
    </div>
  )
}

export default Home
