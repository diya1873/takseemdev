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
import { MdHome } from "react-icons/md";
import "./colored.css";
import { FaArrowAltCircleRight, FaArrowCircleLeft } from "react-icons/fa";

import { BsBorderAll } from "react-icons/bs";
import { AiOutlineTable } from "react-icons/ai";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { useSideBarContext } from "../../components/context/sidebar";
import { useOwnerSideBarContext } from "../../components/context/ownersidebar";

const OwnerSidebar = () => {
  const [open, setOpen] = useState(false);
  const { isCollabsled2, setIsCollabsled2, isClosed2,
    setIClosed2, setIsUserLogedIn2,isUserLogedIn2} = useOwnerSideBarContext();
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleToggleSideBar = () => {
    setIsCollabsled2(!isCollabsled2);
  };

  return (
    <>
      {!isClosed2 && isUserLogedIn2 && (
        <>
          <div
            className={
              isCollabsled2 ? "mysidebar sidebarCollabsed" : "mysidebar"
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
                    {isCollabsled2 ? (
                      <MdHome size={24} />
                    ) : (
                      <>
                        <MdHome size={24} className="me-2" /> Dashboard
                      </>
                    )}
                  </ListItem>
                </Link>

                <Link
                  href="/admin/orders"
                  className="text-decoration-none mt-2 "
                >
                  <ListItem className="white-text text-center ps-3  ms-3 mt-4 ">
                    {isCollabsled2 ? (
                      <BsBorderAll size={24} />
                    ) : (
                      <>
                        <BsBorderAll size={24} className="me-2" />
                        Clients
                      </>
                    )}
                  </ListItem>
                </Link>
                <Link
                  href="/admin/tables"
                  className="text-decoration-none mt-2 "
                >
                  <ListItem className="white-text text-center ps-3  ms-3 mt-4 ">
                    {isCollabsled2 ? (
                      <AiOutlineTable size={24} />
                    ) : (
                      <>
                        <AiOutlineTable size={24} className="me-2" />
                        Payments
                      </>
                    )}
                  </ListItem>
                </Link>
                <Link
                  href="/admin/invoices"
                  className="text-decoration-none mt-2 "
                >
                  <ListItem className="white-text text-center ps-3  ms-3 mt-4 ">
                    {isCollabsled2 ? (
                      <LiaFileInvoiceDollarSolid size={24} />
                    ) : (
                      <>
                        <LiaFileInvoiceDollarSolid size={24} className="me-2" />
                        Statistics
                      </>
                    )}
                  </ListItem>
                </Link>
              </List>
            </div>
            <div className="toggle-button" onClick={handleToggleSideBar}>
              <IconButton>
                {isCollabsled2 ? (
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

export default OwnerSidebar;
