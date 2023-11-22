"use client";

import React, { useEffect } from "react";
import Slide from "../slide/Slide";
import { useMenuData } from "../context/menuapi";
import MenuSlide from "../slide/MenuSlider"
import Slider from "react-slick";

const CustomPrevArrow = (props) => (
  <div
    className="slick-prev"
    onClick={props.onClick}
  >
   
  </div>
);

const CustomNextArrow = (props) => (
  <div
    className="slick-next .ne"
    onClick={props.onClick}
  >

  </div>
);

const MenuHero = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
    // fade: true,
    // cssEase: 'linear',
    arrows: false,
  };

  const { menuData } = useMenuData();
  

  return (
    <div>
        {/* {JSON.stringify(menuData)} */}
      <div className="">
        <Slider {...settings}>
          {menuData?.map((item) => (
            <MenuSlide 
            key={item.id}
            img={item.img}
            targetId={item.targetId}
            type={item.type}
           
          
          />
        ))}
        </Slider>
      </div>
    </div>
  );
};

export default MenuHero;
