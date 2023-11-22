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
    <Head>
<link rel="icon" type="image/png" href="https://media.istockphoto.com/id/1419410282/photo/silent-forest-in-spring-with-beautiful-bright-sun-rays.jpg?s=2048x2048&w=is&k=20&c=t9_zg20wVbrBoGn0tw__1fFq4ykeKs15TQQ3x-ehVC0=" />
<title>Takseem dashboard</title>
<meta name="description" content="RAM" />
</Head>
    <html lang="en">
      <SideBarProvider>
        <body className="adminRoute p-0 m-0">
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
    </html>
    </>
  );
}
