"use client";
import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import "./NavBarc.css";
import CustomToggleIcon from "./CustomToggleIcon";
import CustomSearch from "./CustomSearch";
import Navigation from "./navigation/navigaationMenu";
import { useResturantData } from "../context/resturant";
import Image from "next/image";
import Link from "next/link";
const NavBar = ({}) => {
  const [isMobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  const { resturantData } = useResturantData();
  const showMobileDrawer = () => {
    setMobileDrawerVisible(true);
  };

  const closeMobileDrawer = () => {
    setMobileDrawerVisible(false);
  };

  return (
    <div>
      {resturantData ? (
        <>
          {resturantData.map((resturant) => {
            return (
              <>
                <div
                  className="mobile-nav "
                  style={{ background: `${resturant.header_bgColor}` }}
                >
                  <Navbar expand="xlg">
                    <Navbar.Brand className="d-flex ms-4">
                     <Link href={`/resturant/`}>
                     <img
                        src={resturant.logo}
                        alt="KFC Logo"
                        width={50}
                        height={50}
                      />
                     </Link>
                     <Link href={`/resturant/`} className="text-decoration-none"> <h6
                        className="mt-3 ms-5 "
                        style={{ color: `${resturant.fontColor}` }}
                      >
                        {resturant.name}
                      </h6>   </Link>
                    </Navbar.Brand>
                  
                    <Navbar.Toggle
                      aria-controls="basic-navbar-nav"
                      onClick={showMobileDrawer}
                      className="me-2"
                    >
                      <CustomToggleIcon />
                    </Navbar.Toggle>
                  </Navbar>
                  <Navigation
                    isMobileDrawerVisible={isMobileDrawerVisible}
                    setMobileDrawerVisible={setMobileDrawerVisible}
                    showMobileDrawer={showMobileDrawer}
                    closeMobileDrawer={closeMobileDrawer}
                  />
                </div>
              </>
            );
          })}
        </>
      ) : (
        <>
          <div
            className="mobile-nav "
            style={{ background: ` ##99080C` }}
          >
            <Navbar expand="xlg">
              <Navbar.Brand className="d-flex ms-4">
                <Image
                  src="/images/avatar.png"
                  alt="KFC Logo"
                  width={50}
                  height={50}
                />
                <h6
                  className="mt-3 ms-5 "
                  style={{ color: `white` }}
                >
                  {`resturant.name`}
                </h6>
              </Navbar.Brand>
           
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                onClick={showMobileDrawer}
                className="me-2"
              >
                <CustomToggleIcon />
              </Navbar.Toggle>
              
            </Navbar>
           
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
