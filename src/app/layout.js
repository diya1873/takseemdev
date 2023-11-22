
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Takseem",
  description: "RAM"
       
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">


              <body className={`${inter.className} p-o m-0`} >

              
                    {children}
      </body>

    </html>
  );
}

