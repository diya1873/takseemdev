"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

//1) Create the context
export const OwnerSideBarContext = createContext();

//step2:create the provider
export function OwnerSideBarProvider({ children }) {
  const [isCollabsled2, setIsCollabsled2] = useState(false);
    const[isClosed2,setIClosed2]=useState(false)
    const [isUserLogedIn2,setIsUserLogedIn2]=useState(false)

    useEffect(()=>{
        const token=typeof window !== 'undefined' ?window.localStorage.getItem("token"): null;
        if(!token){
          setIsUserLogedIn2(false)
        }else{
          setIsUserLogedIn2(true)
        }
      },[isUserLogedIn2])
  return (
    
    <OwnerSideBarContext.Provider value={{ isCollabsled2,
     setIsCollabsled2 ,isClosed2,setIClosed2,setIsUserLogedIn2,isUserLogedIn2}}>
      {children}
    </OwnerSideBarContext.Provider>
  );
}

//3 create the Use context hook
export function useOwnerSideBarContext() {
  // use the useContext hook to access the context data
  const context = useContext(OwnerSideBarContext);
  // return the context data
  return context;
}
