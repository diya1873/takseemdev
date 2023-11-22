"use client"
import React, { useState, useEffect } from 'react';
import './logoslider.css';
import Image from 'next/image';
import one from'../../../public/resturantslogos/1.jpeg';
import two from'../../../public/resturantslogos/2.jpeg';
import three from'../../../public/resturantslogos/3.jpg';
import four from'../../../public/resturantslogos/4.jpg';
import five from'../../../public/resturantslogos/5.png';
import six from'../../../public/resturantslogos/6.jpg';
import seven from'../../../public/resturantslogos/7.jpg';
import eight from'../../../public/resturantslogos/8.jpg';
import nine from'../../../public/resturantslogos/9.png';
import ten from'../../../public/resturantslogos/10.jpeg';

const OurClients = () => {
 
  return (
    <div className="slider">
    <div className="slide-track">
      <div className="slide">
        <Image className='sliderimg' src={one}  width={50} alt=""/>
      </div>
      <div className="slide">
        <Image className='sliderimg' src={two}  width={50} alt=""/>
      </div>
      <div className="slide">
        <Image className='sliderimg' src={three}  width={50} alt=""/>
      </div>
      <div className="slide">
        <Image className='sliderimg' src={four}  width={50} alt=""/>
      </div>
      <div className="slide">
        <Image className='sliderimg' src={five}  width={50} alt=""/>
      </div>
      <div className="slide">
        <Image className='sliderimg' src={six}  width={50} alt=""/>
      </div>
      <div className="slide">
        <Image className='sliderimg' src={seven}  width={50} alt=""/>
      </div>
      <div className="slide">
        <Image className='sliderimg' src={eight}  width={50} alt=""/>
      </div>
      <div className="slide">
        <Image className='sliderimg' src={nine}  width={50} alt=""/>
      </div>
      <div className="slide">
        <Image className='sliderimg' src={ten}  width={50} alt=""/>
      </div>
     
    </div>
  </div>
  );
};

export default OurClients;
