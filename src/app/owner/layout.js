import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OwnerSidebar from "../../ownercomponents/staticcomplonents/AppSidebar";
import { SideBarProvider } from "../../components/context/sidebar";
import './global.css'
import OwnerAppHeader from "../../ownercomponents/staticcomplonents/AppHeader";
import OwnerFooter from "../../ownercomponents/footer/page";
import { OwnerSideBarContext, OwnerSideBarProvider } from "../../components/context/ownersidebar";


const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Takseem",
  description: "OWNER DAHBOARD",
};


export default async function RootLayout({ children }) {
  return (
    <html lang="en">
       
         <OwnerSideBarProvider>
        
      <body className={`${inter.className}  `}>
      <OwnerAppHeader/>
      <di className="d-flex p-0 m-0 ownerRoute">
            <div className="d-flex">
              <OwnerSidebar />
            </div>
            <div className="w-100 p-0 m-0">{children}</div>
          </di>
          <OwnerFooter/>
      </body>
      </OwnerSideBarProvider>
     
    </html>
  );
}
