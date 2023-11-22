"use client";

import "./content.css";
import Image from "next/image";
import calc from'../../../public/calc.png';
import React, { useState, useEffect } from 'react';
import LogoSlider from "./logoslider";
import FAQ from "../faq/faq";

function Content() {
    
  return (
    <div className="container-fluid  contentPage">
        
      <div className="row ">
        <h4 className="text-center ">
          <span className="oricon">|<b className="text-dark fw-bolder fo">About us</b></span>{" "}
          
        </h4>
        <div className="col-md-8 mt-5 ">
          <p className="text-start mt-3 m-md-5 p-md-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when
          </p>
        </div>
        <div className="col-md-4 mt-5 p-md-5"> <Image

                    alt="img"
                    src={calc}
                    width={200}
                    height={200}
                  /></div>
      </div>
      <div className="row">
     

<section id="advertisers" className="advertisers-service-sec pt-5 pb-5">
  <div className="container">
    <div className="row">
      <div className="section-header text-center">
        <span className="fw-bold fs-1 b-class-secondary ms-1">
          Our Services
        </span>
       
        <p className="sec-icon"><i className="fa-solid fa-gear"></i></p>
      </div>
    </div>
    <div className="row mt-5 mt-md-4 row-cols-1 row-cols-sm-1 row-cols-md-3 justify-content-center">
      <div className="col">
        <div className="service-card">
          <div className="icon-wrapper">
            <i className="fa-solid fa-chart-line"></i>
          </div>
          <h3>Tracking Lead</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Quisquam consequatur necessitatibus eaque.
          </p>
        </div>
      </div>
      <div className="col">
        <div className="service-card">
          <div className="icon-wrapper">
            <i className="fa-solid fa-arrows-down-to-people"></i>
          </div>
          <h3>Advanced Targeting solution</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Quisquam consequatur necessitatibus eaque.
          </p>
        </div>
      </div>
      <div className="col">
        <div className="service-card">
          <div className="icon-wrapper">
            <i className="fa-solid fa-globe"></i>
          </div>
          <h3>Global Reach & Quality Traffic</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Quisquam consequatur necessitatibus eaque.
          </p>
        </div>
      </div>
      <div className="col">
        <div className="service-card">
          <div className="icon-wrapper">
            <i className="fa-solid fa-money-check-dollar"></i>
          </div>
          <h3>Flexible pricing models</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Quisquam consequatur necessitatibus eaque.
          </p>
        </div>
      </div>
      <div className="col">
        <div className="service-card">
          <div className="icon-wrapper">
            <i className="fa-regular fa-circle-check"></i>
          </div>
          <h3>Advanced optimization technologies & methodologies</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Quisquam consequatur necessitatibus eaque.
          </p>
        </div>
      </div>
      <div className="col">
        <div className="service-card">
          <div className="icon-wrapper">
            <i className="fa-solid fa-people-group"></i>
          </div>
          <h3>Dedicated account management team</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Quisquam consequatur necessitatibus eaque.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      </div>
      <div className="row mt-5">
      <h4 className="text-center ">
      <span className="oricon">|<b className="text-dark fw-bolder fo">Our Clients</b></span>{" "}

        
        </h4>
        <LogoSlider/>
      </div>
      <div className="row m-5">
        <FAQ/>
      </div>
    </div>
  );
}

export default Content;
