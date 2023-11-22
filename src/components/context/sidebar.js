"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

//1) Create the context
export const SideBarContext = createContext();

//step2:create the provider
export function SideBarProvider({ children }) {
  const [isCollabsled, setIsCollabsled] = useState(false);
    const[isClosed,setIClosed]=useState(false)
    const [isUserLogedIn,setIsUserLogedIn]=useState(false)

    useEffect(()=>{
        const token=window.localStorage.getItem("token")
        if(!token){
          setIsUserLogedIn(false)
        }else{
          setIsUserLogedIn(true)
        }
      },[isUserLogedIn])
  return (
    <SideBarContext.Provider value={{ isCollabsled,
     setIsCollabsled ,isClosed,setIClosed,setIsUserLogedIn,isUserLogedIn}}>
      {children}
    </SideBarContext.Provider>
  );
}

//3 create the Use context hook
export function useSideBarContext() {
  // use the useContext hook to access the context data
  const context = useContext(SideBarContext);
  // return the context data
  return context;
}
