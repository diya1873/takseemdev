import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useProductsData } from "../context/products";

const MenuSlide = ({ targetId, type, img }) => {
  const { setCategoryId } = useProductsData();
  console.log("targetId",targetId,"type",type)
  const handleFilterProducts = () => {
    if(type === 2){setCategoryId(targetId);}

    if (type === 2) {
      // Scroll down by 150 pixels
      window.scrollBy(0, 150);
    }
  };
 

  return (<>{
    type === 3?(<> <Link href={`/resturant/${targetId }`}>
      <img
        className="w-100"
        src={img}
        alt="banner"
        width={`100%`}
        height={300}
        priority={true}
        onClick={handleFilterProducts}
      /></Link></>):(<img
        className="w-100"
        src={img}
        alt="banner"
        width={`100%`}
        height={300}
        priority={true}
        onClick={handleFilterProducts}
      />)}
      </>
    
  );
};

export default MenuSlide;
