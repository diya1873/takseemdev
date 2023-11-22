"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useCategoriestData } from "./categories";

//1) Create the context
export const ProductsContext = createContext();

//step2:create the provider

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState(null);

    //fetching categories [0]
    const {firstCategoryId}=useCategoriestData()

    const [categoryId, setCategoryId] = useState(); 
    
  const getProductsList = async () => {
    
    try {
      
      const response = await axios.get(
        `http://192.168.1.121:3030/category/products/${categoryId}`
      );
      if (response.status === 200) {
        setProducts(response.data);
        // console.log("products", response.data);
      } else {
        throw  new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching ProductsList:", error);
    }
  };

  useEffect(() => {
   
    getProductsList();
  }, [categoryId]);

  const SetFirst=()=>{
    setCategoryId(firstCategoryId)
  }
useEffect(()=>{
  SetFirst()
},[firstCategoryId])

  return (
    <ProductsContext.Provider
    value={{ products,categoryId, setCategoryId }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

//3 create the Use context hook
export function useProductsData() {
  // use the useContext hook to access the context data
  const context = useContext(ProductsContext);
  // return the context data
  return context;
}
//4 Integrate the CartProvider in the Upermost component