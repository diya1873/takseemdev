"use client"
import './NavBarc.css'
import React from 'react';
import { PiListDashes } from 'react-icons/pi';
import { useResturantData } from "../context/resturant";

const CustomToggleIcon = () =>{

  const { resturantData } = useResturantData();
  return (<div>
    {resturantData?.map((resturant)=>{
      return(<>
      <div className='d-inline ' style={{color:`${resturant.menu_bgColor}`}}>
    <PiListDashes />
  </div></>)
    })}

  </div>
  
);
}
export default CustomToggleIcon;