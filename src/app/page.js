"use client";
import MenuHero from "../components/Hero/MenuHero";
import CategoryHero from "../components/Hero/categoriesHero";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import HomeNave from "../homecomponents/navbar/NavBar";
import Slideshow from "../homecomponents/slider/slider";
 import Content from "../homecomponents/content/content";
import "./page.css";
import Homefooter from "../homecomponents/footer/homefooter";

const Home = () => {
  return (
    <>
      <HomeNave />
      <div className=" p-0 m-0">
    <Slideshow/>
          </div>
     <Content /> 
      <Homefooter />
    </>
  );
};
export default Home;
