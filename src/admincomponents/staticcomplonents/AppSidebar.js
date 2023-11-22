"use client";
// components/Sidebar.js
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  MdDashboard,
  MdExpandMore,
  MdExpandLess,
  MdHome,
  MdSquare,
} from "react-icons/md";
import "./colored.css";
import { FaArrowAltCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { useSideBarContext } from "../../components/context/sidebar";
import { BsBorderAll } from "react-icons/bs";
import { AiOutlineTable } from "react-icons/ai";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import {FcSettings, FcStatistics} from 'react-icons/fc'
import {RiCoupon2Line} from 'react-icons/ri'
import { TfiLayoutSlider } from "react-icons/tfi";
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { isCollabsled, setIsCollabsled, isClosed,
     setIClosed, setIsUserLogedIn,isUserLogedIn} = useSideBarContext();
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleToggleSideBar = () => {
    setIsCollabsled(!isCollabsled);
  };
 
  return (
    <>
      {!isClosed &&isUserLogedIn&& (
        <>
          <div
            className={
              isCollabsled ? "mysidebar sidebarCollabsed" : "mysidebar"
            }
            style={{ backgroundColor: "#233243" }}
          >
            <div className="sidebar-top">
              <List>
                <Link
                  href="/admin/dashboard"
                  className="text-decoration-none mt-2"
                >
                  <ListItem
                    button
                    className="white-text text-center ps-3 ms-3 "
                  >
                    {isCollabsled ? (
                      <MdHome size={24} />
                    ) : (
                      <>
                        <MdHome size={24} className="me-2" /> Dashboard
                      </>
                    )}
                  </ListItem>
                </Link>
                <ListItem
                  button
                  onClick={handleToggle}
                  className="white-text text-center ps-3 mt-4 ms-3 "
                >
                  {isCollabsled ? (
                    <MdDashboard size={24} />
                  ) : (
                    <>
                      <MdDashboard size={24} className="me-2" />
                      Menus
                    </>
                  )}
                  {open && isCollabsled ? (
                    <MdExpandLess />
                  ) : (
                    <MdExpandMore className=" " />
                  )}
                </ListItem>
                <Collapse in={open} unmountOnExit>
                  <List component="div" disablePadding>
                    <Link
                      href="/admin/menus/categories"
                      className="text-decoration-none mt-2"
                    >
                      <ListItem button className="white-text mt-1">
                        Categories
                        {isCollabsled ? null : <ListItemText />}
                      </ListItem>
                    </Link>
                    <Link
                      href="/admin/menus/products"
                      className="text-decoration-none mt-2"
                    >
                      <ListItem button className="white-text mt-1">
                        {" "}
                        Products
                      </ListItem>
                    </Link>
                  </List>
                </Collapse>
                <Link
                  href="/admin/orders"
                  className="text-decoration-none mt-2 "
                >
                  <ListItem className="white-text text-center ps-3  ms-3 mt-4 ">
                    {isCollabsled ? (
                      <BsBorderAll size={24} />
                    ) : (
                      <>
                        <BsBorderAll size={24} className="me-2" />
                        Orders
                      </>
                    )}
                  </ListItem>
                </Link>
                <Link
                  href="/admin/tables"
                  className="text-decoration-none mt-2 "
                >
                  <ListItem className="white-text text-center ps-3  ms-3 mt-4 ">
                    {isCollabsled ? (
                      <AiOutlineTable size={24} />
                    ) : (
                      <>
                        <AiOutlineTable size={24} className="me-2" />
                        Tables
                      </>
                    )}
                  </ListItem>
                </Link>
                <Link
                  href="/admin/invoices"
                  className="text-decoration-none mt-2 "
                >
                  <ListItem className="white-text text-center ps-3  ms-3 mt-4 ">
                    {isCollabsled ? (
                      <LiaFileInvoiceDollarSolid size={24} />
                    ) : (
                      <>
                        <LiaFileInvoiceDollarSolid size={24} className="me-2" />
                        Invoices
                      </>
                    )}
                  </ListItem>
                </Link>
                <Link
                  href="/admin/statistics"
                  className="text-decoration-none mt-2 "
                >
                  <ListItem className="white-text text-center ps-3  ms-3 mt-4 ">
                    {isCollabsled ? (
                      <FcStatistics size={24} />
                    ) : (
                      <>
                        <FcStatistics size={24} className="me-2" />
                        Statistics
                      </>
                    )}
                  </ListItem>
                  
                </Link>
               
                
                <Link
                  href="/admin/slider"
                  className="text-decoration-none mt-2 "
                >
                <ListItem className="white-text text-center ps-3  ms-3 mt-4 ">
                    {isCollabsled ? (
                      <TfiLayoutSlider size={24} />
                    ) : (
                      <>
                        <TfiLayoutSlider size={24} className="me-2" />
                        Slider
                      </>
                    )}
                  </ListItem></Link>
                <Link
                  href="/admin/settings"
                  className="text-decoration-none mt-2 "
                >
                <ListItem className="white-text text-center ps-3  ms-3 mt-4 ">
                    {isCollabsled ? (
                      <FcSettings size={24} />
                    ) : (
                      <>
                        <FcSettings size={24} className="me-2" />
                        Settings
                      </>
                    )}
                  </ListItem></Link>
              </List>
            </div>
            <div className="toggle-button" onClick={handleToggleSideBar}>
              <IconButton>
                {isCollabsled ? (
                  <FaArrowAltCircleRight className="text-white" />
                ) : (
                  <FaArrowCircleLeft className="text-white" />
                )}
              </IconButton>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
