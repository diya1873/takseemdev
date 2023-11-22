"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

//1) Create the context
export const CartContext = createContext();

//step2:create the provider
export function CartProvider({ children }) {
    const [cart, setCart] = useState(null);
    const [isChanged, setIsChanged] = useState(false);
    const[ cartId,setCartId]=useState()


    const fetchCartDta = async () => {
      try {

        const resturantId = window.localStorage.getItem('menuResturantId');
        const menuTableId = window.localStorage.getItem('menuTableId');
        
        const response = await axios.get(`http://192.168.1.121:3030/cart/cart-details?restaurantId=${resturantId}&tableId=${menuTableId}`);
        if (response.status === 200) {
          setCart(response.data);
           console.log("cart",response.cart)
           console.log("cart",response.cart)
           setCartId(response.data.id)
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

  useEffect(() => {
    console.log('isChanged',isChanged)
    fetchCartDta();
  }, [isChanged]);


  return (
    <CartContext.Provider
      value={{cart,setCart,setIsChanged,isChanged}}
    >
      {children}
    </CartContext.Provider>
  );
}

//3 create the Use context hook
export function useCartData() {
  // use the useContext hook to access the context data
  const context = useContext(CartContext);
  // return the context data
  return context;
}
