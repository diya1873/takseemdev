"use client";
import React, { useEffect, useState } from "react";
import "./productslist.css";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { products, useProductsData } from "../../components/context/products";
import { Empty } from "antd";
import Link from "next/link";
const ProductsList = () => {

  const { setCategoryId } = useProductsData();
  // useEffect(()=>{
  //   if(window.localStorage.getItem("filterCategory")){
  //     setCategoryId(window.localStorage.getItem("filterCategory"));
  //   }
  // },[])

  const { products } = useProductsData();

  return (
    <div className="div">
      {products && products.length !== 0 ? (
        products.map((product) => (
          <>
            <Link className="text-decoration-none" href={`/resturant/${product.id}`}>
              <div className="card mt-3 m-4 " key={product.id}>
                <div className=" ">
                  <span className="float-end " >
                    <img
                      src={product.img}
                      alt={product.name}
                      width={`100`}
                      height={`100`}
                     
                    />
                  </span>
                  <span className="ms-2 row ">
                    <div className="row ">
                      <div className="col ">
                        <h6 className="p-2">{product.name.slice(0, 25)}</h6>
                        <small>
                          {product.description.length > 50 ? (
                            <>{product.description.slice(0, 50)}...</>
                          ) : (
                            product.description
                          )}
                        </small>
                       
                        {product.price!==0?(
                          <span className="float-end text-dark mt-2 mb-1">
                            {product.price} <b className="text-danger"> Jod</b>
                          </span>):(<> <span className="float-end text-danger mt-2 mb-1 text-danger">
                 Price On Selection
                          </span></>)
                        }
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            </Link>
          </>
        ))
      ) : (
        <>
          <div className="card mt-3 m-4 productcard">
            <Empty />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsList;
