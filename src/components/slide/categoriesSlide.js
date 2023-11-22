"use client"
import Image from "next/image";
import React, { useState } from "react";
import './categoryslide.css'
import Link from "next/link";
import { useProductsData } from "../context/products";


const CategorySlide = ({ id,img,name }) => {

  
  const { setCategoryId } = useProductsData();
  const handleFilterProducts = (id) => {
    setCategoryId(id);
   
  }
  return (
    
   
   
    <div className="category-item"  onClick={()=>handleFilterProducts(id)}>
      <img
      className=""
        src={img}
        alt="banner"
        width={'150px'}
        height={`150px`}
        priority={true}
      />
       <h6 className=" mt-2">{name}</h6>
    </div>
  );
};

export default CategorySlide;
