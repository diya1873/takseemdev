"use client";

import React, { useEffect } from "react";
import Slider from "react-slick";
import Slide from "../slide/Slide";




const Hero = ({products}) => {
console.log('im from hero',products)
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    pauseOnHover: false,
    arrows: false,
  };

  

const currentImage = products?.img; // Current image
const images = Array.isArray(products?.images)? products?.images:[]; // Array of additional images

// Combine the current image and additional images
const allImages = [currentImage, ...images];



  return (
    <div>
      <div className="container-lg">
        <Slider {...settings}>
          {allImages?.map((img,index) => (
            <Slide 
              key={index}
              img={img}
            
            />
            
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
