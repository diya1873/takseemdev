"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

//1) Create the context
export const MenuContext = createContext();

//step2:create the provider
export function MenuProvider({ children }) {
    const [menuData, setMenuData] = useState(null);

    const fetchMenuData = async () => {
      try {


        const resturantId = typeof window !== 'undefined' ?window.localStorage.getItem('menuResturantId'): null;

        const response = await axios.get(`http://192.168.1.121:3030/slider/list/${resturantId}`);
        if (response.status === 200) {
            setMenuData(response.data);
            // console.log("MenuData",response.data)
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching MENU:", error);
      }
    }

  useEffect(() => {
    fetchMenuData();
  }, []);


  return (
    <MenuContext.Provider
      value={{ menuData}}
    >
      {children}
    </MenuContext.Provider>
  );
}

//3 create the Use context hook
export function useMenuData() {
  // use the useContext hook to access the context data
  const context = useContext(MenuContext);
  // return the context data
  return context;
}
//4 Integrate the CartProvider in the Upermost component