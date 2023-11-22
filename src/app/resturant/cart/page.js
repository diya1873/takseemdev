"use client";
import React, { useEffect, useState } from "react";
import "./cart.css";
import axios from "axios";




import AR from'../../../../public/loader.gif';



import { BsCart3 } from 'react-icons/bs';

import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaArrowLeft,
} from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";


import Link from "next/link";


import { AiFillEdit } from "react-icons/ai";

import { Empty } from "antd";
import { toast } from "react-toastify";
import { useCartData } from "../../../components/context/cart";


const CartPage = () => {
  const { cart, setCart, setIsChanged, isChanged } = useCartData();
  const [isTextareaVisible, setTextareaVisible] = useState(true);
  const [cartNote, setCartNote] = useState('');
  const toggleTextarea = () => {
    setTextareaVisible(!isTextareaVisible);
  };

  const [cartData, setCartData] = useState([]);
  // const [tableId, setTableId] = useState(1);

  //cart/update-quantity/46     46 is the item id and the quantity is {
  //  "quantity": 4
  //}
const handlePlaceOrder=(cartId)=>{

    axios
    .put(`http://192.168.1.121:3030/cart/order/${cartId}`, {
      note:cartNote
    })
    .then((response) => {
            toast.success("Notes has been saved successfully")
            fetchCartData()
            setIsChanged(!isChanged);
    })
    .catch((error) => {
      console.error("Error updating quantity in the database:", error);
    })
    toast.success("Notes has been saved successfully")
    fetchCartData()
    setIsChanged(!isChanged);
}
const restaurantId=typeof window !== 'undefined' ?window.localStorage.getItem("menuResturantId"): null;
const tableId=typeof window !== 'undefined' ?window.localStorage.getItem("menuTableId"): null;
  const fetchCartData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.121:3030/cart/cart-details?restaurantId=${restaurantId}&tableId=${tableId}`
      );
      if (response.status === 200) {
        setCartData(response.data.cartItems);
        console.log(response.data)
       
        setIsChanged(!isChanged);
        // console.log("cartqdqwdqwdw", response.data.id);
      } else {
        throw Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleDecreaseQuantity = (itemId) => {
    // Update the quantity in the database first
    const item = cartData.find((item) => item.id === itemId);

    axios
      .put(`http://192.168.1.121:3030/cart/update-quantity/${itemId}`, {
        quantity: item.quantity - 1,
      })
      .then((response) => {
        // Handle the response as needed
        console.log("Quantity updated in the database:", response.data);

        // If the quantity is successfully updated in the database, update the cart state
        fetchCartData();
      })
      .catch((error) => {
        console.error("Error updating quantity in the database:", error);
      });
  };

  const handleIncreaseQuantity = (itemId) => {
    // Update the quantity in the database first
    const item = cartData.find((item) => item.id === itemId);
    if (item) {
      axios
        .put(`http://192.168.1.121:3030/cart/update-quantity/${itemId}`, {
          quantity: item.quantity + 1,
        })
        .then((response) => {
          // Handle the response as needed
          console.log("Quantity updated in the database:", response.data);

          // If the quantity is successfully updated in the database, update the cart state
          setCartData((prevCartData) => {
            const updatedCartData = prevCartData.map((cartItem) => {
              if (cartItem.id === itemId) {
                return { ...cartItem, quantity: item.quantity + 1 };
              }
              return cartItem;
            });
            return updatedCartData;
          });
        })
        .catch((error) => {
          console.error("Error updating quantity in the database:", error);
        });
    }
  };

  return (
    <>
      <div className="container-fluid CartContainer ">
        <div className="row mt-5 ">
          <div className="col-4" style={{ cursor: "pointer" }}>
            <Link className="text-decoration-none" href={`/resturant`}>
              <span className="ms-4">
                <FaArrowLeft className="h5" />
                <span className="h5 ms-3">Back</span>
              </span>
            </Link>
          </div>
          <div className="col-6">
            <u className="text-center ms-5">
              {cartData.length} {cartData.length > 1 ? `items` : `item`}
            </u>
          </div>
        </div>
        <div className="row">
          {cartData.map((item) => (
            <div className="col-12 p-3" key={item.id}>
              <div className="card ms-2">
                <div className="">
                  <div className="row p-0 m-0">
                    <div className="col-3 p-0 m-0">
                      <span>
                        <img src={item.img} width={100} height={100} />
                      </span>
                    </div>
                    <div className="col-5">
                      <div className="mt-1 pt-2">
                        {item.productName.length > 15 ? (
                          <>
                            {item.productName.slice(0, 16)}..{" "}
                            <Link href={`/resturant/${item.productId}`}>
                              <AiFillEdit className="text-danger ms-1 " />
                            </Link>
                          </>
                        ) : (
                          <>
                            {item.productName}{" "}
                            <Link href={`/resturant/${item.productId}`}>
                              <AiFillEdit className="text-danger ms-3 " />
                            </Link>
                          </>
                        )}{" "}
                      </div>
                      <div className="">
                        <span>
                          {" "}
                          <span>
                            {item.note.length > 18 ? (
                              <>{item.note.slice(0, 18)}...</>
                            ) : (
                              <>{item.note}</>
                            )}
                          </span>
                        </span>
                      </div>
                      <div className="mt-1">
                        <span>{item.productPrice} Jod</span>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="counter mt-3">
                        <span
                          style={{ display: "flex", alignItems: "center" }}
                          className="cursor"
                          onClick={() => handleDecreaseQuantity(item.id)}
                        >
                          -
                        </span>
                        <input
                          className="custom-input"
                          type="number"
                          value={item.quantity}
                        />
                        <span
                          style={{ display: "flex", alignItems: "center" }}
                          className="cursor"
                          onClick={() => handleIncreaseQuantity(item.id)}
                        >
                          +
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        

        {cart?.cartItems.length? (
          <><hr />
            {" "}
            <div className="row mt-5">
              <h6 className="ms-2">
                <span>Cart total</span>
              </h6>
              {cartData.map((item) => (
                <>
                  <div className="mt-3 m-3" key={item.id}>
                    <span>{item.productName}</span>

                    <span className="float-end me-5">
                      {item.productPrice} Jod
                    </span>
                  </div>
                </>
              ))}
              <hr />
            </div>
            <div className="row mt-5">
              <span>
                <div className="requestsContainer">
                  <span>
                    <BiMessageDetail style={{ fontSize: "20px" }} />
                  </span>
                  <span>Any Special requests</span>
                  <span className="addNotes" onClick={toggleTextarea}>
                    Add note
                  </span>
                </div>
              </span>{" "}
              <div className="container">
                <textarea
                  className="text-area form-control w-100"
                  style={{ display: isTextareaVisible ? 
                    "block" : "none" }}
                  placeholder="Enter your note here..."
                  value={cartNote}
                  onChange={(e)=>setCartNote(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-5">
              <h6>
                <span className="ms-3">Total Price</span>
                <span className="float-end me-5">16.5 Jod</span>
              </h6>
            </div>
            <hr />
            <div className="row">
              <p className="ms-3">
                <span className="text-danger">*</span>Price does not include
                taxes and services
              </p>
            </div>
          </>
        ) : (
          <> <div className="row mt-5 d-flex justify-content-center">
              
       
          <div className=" p-4 productcard">
            <Empty />
          </div>
      
            </div>
            <div className="emptyrow row mt-2">
            <div className="wrap d-flex justify-content-center">
           <Link href={`/resturant`}><span href="#" className="animated-button1">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
<BsCart3/> Continue Shopping
</span></Link> </div>
                </div></>
        )}
        {cart?.cartItems.length>0?(<> <div className="mt-3 row">
          <div className="col-6">
           


            <Link className="text-decoration-none text-dark" href={`/resturant`}>
              <div className="ms-4 btn btn addMore">Add Items</div>
            </Link>
          </div>
          <div className="col-6">
            <button className="ms-4 btn btn placeOrder " onClick={()=>handlePlaceOrder(cart.cart.id)} >Place order</button>
          </div>
        </div></>):(<>
        
        </>)}
      </div>
    </>
  );
};

export default CartPage;
