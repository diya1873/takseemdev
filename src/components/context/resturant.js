"use client";

import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
//1) Create the context
export const RestaurantContext = createContext();

//step2:create the provider
export function ResturantProvider({ children }) {
    const [resturantData, setResturantData] = useState(null);
 
  const fetchResturantData = async () => {
    try {

      const resturantId = window.localStorage.getItem('menuResturantId');


      const response = await axios.get(`http://192.168.1.121:3030/restaurant/list/${resturantId}`);
      // console.log("restaurantData", response);
      setResturantData(response.data);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  }
  useEffect(() => {
    

    fetchResturantData();
  }, []);


  return (
    <RestaurantContext.Provider
      value={{ resturantData}}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

//3 create the Use context hook
export function useResturantData() {
  // use the useContext hook to access the context data
  const context = useContext(RestaurantContext);
  // return the context data
  return context;
}
//4 Integrate the CartProvider in the Upermost component