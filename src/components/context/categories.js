"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useProductsData } from "./products";


//1) Create the context
export const CategoriesContext = createContext();

//step2:create the provider
export function CategoriesProvider({ children }) {
 


    const [categoriesData, setCategoriesData] = useState(null);
    const[firstCategoryId,setFirstCategoryId]=useState(null)




    const fetchCategoriesData = async () => {
      console.log("categoriesDatawdawd",categoriesData)
      try {
        const resturantId = typeof window !== 'undefined' ?window.localStorage.getItem('menuResturantId'): null;
        const response = await axios.get(`http://192.168.1.121:3030/category/list/${resturantId}`);
        if (response.status === 200) {
            setCategoriesData(response.data);
            setFirstCategoryId(response.data[0].id)
            console.log("categoriesData",response.data)
            console.log("categoriesDatwqdqwa",response.data[0].id)
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

  useEffect(() => {
  

    fetchCategoriesData();
  }, []);


  return (
    <CategoriesContext.Provider
      value={{firstCategoryId, categoriesData}}
    >
   
      {children}
    </CategoriesContext.Provider>
  );
}

//3 create the Use context hook
export function useCategoriestData() {
  // use the useContext hook to access the context data
  const context = useContext(CategoriesContext);
  // return the context data
  return context;
}
//4 Integrate the CartProvider in the Upermost component