"use client";

import React, { useEffect, useState } from "react";
import CategorySlide from "../slide/categoriesSlide";
import Slider from "react-slick";
import { useCategoriestData } from "../context/categories";
import "./categoryHero.css";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const CustomPrevArrow = (props) => (
  <div className="slick-prev" onClick={props.onClick}></div>
);

const CustomNextArrow = (props) => (
  <div className="slick-next .ne" onClick={props.onClick}></div>
);

const CategoryHero = () => {
  const [isHovered, setIsHovered] = useState(true);
  const { categoriesData } = useCategoriestData();
  const slidesToShow = categoriesData?.length >= 4 ? 4 : categoriesData?.length;
  const slidesToScroll = Math.min(1, slidesToShow?slidesToShow:1); 

  const settings = {
    slidesToShow: categoriesData?.length >= 4 ? 4 : 1,
    slidesToScroll: categoriesData?.length >= 4 ? 3 : 1,
    autoplay: !isHovered, // Only autoplay when not hovered
    pauseOnHover: true, // Pause on hover
    autoplaySpeed: 1500,
    arrows: true,

    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        
        breakpoint: 520,
        settings: {
          arrows: true,
          prevArrow: <CustomPrevArrow />,
          nextArrow: <CustomNextArrow />,
          autoplay: !isHovered, // Only autoplay when not hovered
          pauseOnHover: true, // Pause on hover
          slidesToScroll:slidesToScroll,
          slidesToShow :slidesToShow
        },
      },
      {
        breakpoint: 520,
        settings: {
          arrows: true,
          autoplay: !isHovered, // Only autoplay when not hovered
          pauseOnHover: true, // Pause on hover
          prevArrow: <CustomPrevArrow />,
          nextArrow: <CustomNextArrow />,
          slidesToScroll:slidesToScroll,
          slidesToShow:slidesToShow,
        },
      },
    ],
  };

  return (
    <div className="container-lg">
      <Slider {...settings}>
        {categoriesData?.map((item) => (
          <>
            <CategorySlide
              key={item.id}
              img={item.img}
              id={item.id}
              name={item.name}
            />
          </>
        ))}
      </Slider>
    </div>
  );
};

export default CategoryHero;
