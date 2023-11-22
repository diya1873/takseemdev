"use client"
import { Carousel } from 'antd';
import { useState } from 'react';
import './slider.css'

function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
   
    
    infinite: true,
    speed: 500,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
    autoplay: true,
    speed: 1000,
    
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 2,
   
    vertical: true, // Enable vertical sliding
    draggable: true, // Enable manual dragging
    swipe: true, // Enable swipe on touch devices
 

  };

  return (
    <div className="split-slideshow">
      <Carousel {...settings} className='slideshow'>
        <div className="item">
          <div className="slide-content">
            <p>TAKSEEM will be the Best Service Provider for your Restaurant</p>
            <img src="https://wallpaper.dog/large/10768015.png" alt="hello" />
          </div>
        </div>
        <div className="item">
          <img src="https://wallpaperaccess.com/full/1267221.jpg" alt="Slide 2" />
        </div>
        <div className="item">
          <img src="https://miro.medium.com/max/3840/1*Act0CYfi-TmFts310z2z_A.jpeg" alt="Slide 3" />
        </div>
        <div className="item">
          <img src="https://images5.alphacoders.com/862/thumb-1920-862186.jpg" alt="Slide4" />
        </div>
      </Carousel>
      <div className="slideshow-text">
        <div className='container'>
          {currentSlide === 0 && (
            <>
              <p>TAKSEEM will be the Best Service Provider to your Restaurant</p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
            </>
          )}
        </div>
        <div className='container'>
          {currentSlide === 1 && (
            <>
              <p>TAKSEEM will be the Best Service Provider to your Restaurant</p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Slideshow;
