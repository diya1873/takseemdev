// "use client"
// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// //1) Create the context
// export const ProductsContext = createContext();

// //step2:create the provider
// export function ProductsProvider({ children }) {
//     const [products, setProducts] = useState(null);
//     const id =props.params.productid;
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(`http://192.168.1.121:3030/product/list/${id}`);
//         if (response.status === 200) {
//             setProducts(response.data);
//             console.log("products",response.data)
//         } else {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     }

//   useEffect(() => {
  

//     fetchProducts();
//   }, [products]);


 
//   return (
//     <ProductsContext.Provider
//       value={{ products}}
//     >
//       {children}
//     </ProductsContext.Provider>
//   );
// }

// export function useProducts() {
//   const context = useContext(ProductsContext);
//   return context;
// }
