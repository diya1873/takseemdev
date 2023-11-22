"use client";
import React, { useEffect } from "react";
import "./footer.css";
import { AiOutlineHome } from "react-icons/ai";
import { BsCart3 } from 'react-icons/bs';
import { BiSolidReport } from "react-icons/bi";
import { Avatar, Badge, Space } from "antd";
import { MdPayment } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import Link from "next/link";


import { useCartData } from "../context/cart";

const Footer = () => {
  const {cart}=useCartData()
  return (
    <div className=" justify-content-center mainfooter  mb-5">
      <Link href="/resturant/" className="text-decoration-none">
      <div className="footer-item " >
        <AiOutlineHome className="h1 ms-1" />
        <br />
        <span>Home</span>
      </div></Link>

      <Link  className="text-decoration-none"  href="/resturant/cart"><div className="footer-item ">
      <Badge count={cart?.cartItems.length} offset={[-3,0]}>
        <BsCart3
          className="h1 ms-1"
          
        />
 </Badge>
        <br />
        <span>Cart</span>
      </div></Link> 

      <Link href="/resturant/checkout" className="text-decoration-none"> <div className="footer-item " >
      <MdPayment className="h1 ms-" />
        <br />
        <span>Checkout</span>
      </div></Link>


      <Link href="/resturant/search" className="text-decoration-none"> <div className="footer-item " >
      <BsSearch  className="h1 ms-" />
        <br />
        <span>Search</span>
      </div></Link>
    </div>
  );
};

export default Footer;
