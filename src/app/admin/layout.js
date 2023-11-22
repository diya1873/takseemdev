
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResturantFooter from "../../admincomponents/footer/page";
import "./scss/style.scss";
import AppHeader from "../../admincomponents/staticcomplonents/AppHeader";
import Sidebar from "../../admincomponents/staticcomplonents/AppSidebar";
import {
  SideBarContext,
  SideBarProvider,
} from "../../components/context/sidebar";

import "react-toastify/dist/ReactToastify.css";
import Head from 'next/head';
import { OwnerSideBarProvider } from "../../components/context/ownersidebar";

export const metadata = {
  title: "Takseem dashboard",
  description: "RAM",
  openGraph: {
    images: 'https://photos.sphereshowcase.com/tBJczsgyzUAP3woETDr31.jpg',
  },
};

const inter = Inter({ subsets: ["latin"] });

export default async function AdminRootLayout({ children }) {
  return (
    <>
  
  <html lang="en">
    <OwnerSideBarProvider>
      <SideBarProvider>
      <body className={`${inter.className}  `}>
          
      <AppHeader />   
          <ToastContainer />
          <di className="d-flex p-0 m-0">
            <div className="d-flex">
              <Sidebar />
            </div>
            <div className="w-100 p-0 m-0">{children}</div>
          </di>

          <ResturantFooter />
        </body>
      </SideBarProvider>
      </OwnerSideBarProvider>
   </html>
    </>
  );
}
