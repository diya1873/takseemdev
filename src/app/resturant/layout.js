import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/navbar/NavBar";
import { ResturantProvider } from "../../components/context/resturant";
import { CategoriesProvider } from "../../components/context/categories";
import { ProductsProvider } from "../../components/context/products";

import { CartProvider } from "../../components/context/cart";

import { MenuProvider } from "../../components/context/menuapi";

import '../../../node_modules/simplebar-react/dist/index'

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Takseem",
  description: "RAM",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">

    <CartProvider>
      <ResturantProvider>
        <CategoriesProvider>
          <MenuProvider>
            <ProductsProvider>
              <body className={`${inter.className} body  body bg-secondary `}>
             <div className="row d-flex justify-content-center  bg-secondary m-0 "> 
                               <div className=" col-sm-12 col-lg-6 col-md-8  col-xl-4   border  bg-white p-0 ">
                    <NavBar />
                    <ToastContainer />
                    {children}
                    <Footer />
                  </div>
                </div>
              
              </body>
            </ProductsProvider>
          </MenuProvider>
        </CategoriesProvider>
      </ResturantProvider>
      </CartProvider>
    </html>
  );
}
