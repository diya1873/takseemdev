"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CCard,
  CCardBody,
  CCardHeader,
  CBadge,
  CAvatar,
} from "@coreui/react";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import moment from "moment";
import CIcon from "@coreui/icons-react";
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from "@coreui/icons";
import AppHeaderDropdown from "./AppHeaderDropdown";
import { toast } from "react-toastify";
import "./header.css";
import AppBar from "@mui/material/AppBar";
import { Badge } from "antd";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSideBarContext } from "../../components/context/sidebar";
const AppHeader = () => {
  const [sidebarShow, setSidebarShow] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {}, []);

  const handleScroll = (event) => {
    event.stopPropagation();
  };

  const user = {
    role: "admin",
  };

  const token = typeof window !== 'undefined' ? window.localStorage.getItem("token") : null;


  const {
    isCollabsled,
    setIsCollabsled,
    isClosed,
    setIClosed,
    setIsUserLogedIn,
    isUserLogedIn,
  } = useSideBarContext();

  const handleClose = () => {
    setIClosed(!isClosed);
  };

  const menuTableId=typeof window !== 'undefined' ? window.localStorage.getItem("menuTableId"): null;
  const menuResturantId=typeof window !== 'undefined' ? window.localStorage.getItem("restaurantId"): null;
  return (
    <AppBar position="" color="error" enableColorOnDark>
      <CHeader className="mb-1 Cheader">
        <CContainer fluid>
          {isUserLogedIn && (
            <CHeaderToggler className="ps-1">
              <CIcon icon={cilMenu} size="lg" onClick={handleClose} />
            </CHeaderToggler>
          )}

          <CHeaderBrand className="mx-auto d-md-none" />
          <CHeaderNav className=" d-md-flex me-auto">
            <CNavItem>
              <CNavLink>
                <CAvatar size="lg">
                  <Image src={logo} width={`500px`} height={`250px`} />
                </CAvatar>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink className="mt-2" href="/">
                home
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink className="mt-2" href="/">
                Clients
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink className="mt-2" href="/">
                About Us
              </CNavLink>
            </CNavItem>
          </CHeaderNav>
          {isUserLogedIn && (
            <>
              {" "}
              <CHeaderNav>
                <CNavItem>
                  <CDropdown inNav ref={dropdownRef}>
                    <CDropdownToggle caret variant="none">
                      <Badge count={2} offset={[-3, 0]}>
                        <CIcon icon={cilBell} size="lg" />
                      </Badge>
                    </CDropdownToggle>

                    <CDropdownMenu placement="bottom-end">
                      {" "}
                      <div
                        style={{ maxHeight: "500px", overflowY: "auto" }}
                        onScroll={handleScroll}
                      >
                        <CDropdownItem>first notification</CDropdownItem>
                        <CDropdownItem>second notification</CDropdownItem>
                      </div>
                    </CDropdownMenu>
                  </CDropdown>
                </CNavItem>
              </CHeaderNav>
              <CHeaderNav className="ms-3">
                <AppHeaderDropdown />
              </CHeaderNav>
            </>
          )}
          <CHeaderNav>
            <CNavItem>
             {token?(<Link target="_blank" href={`/resturant?resid=${menuResturantId}&restableid=${menuTableId}`}> <button
                className="btn text-white"
                style={{
                  backgroundColor: "#99080C",
                  border: "1px solid",
                  borderRadius: "25px",
                  padding: "10px",
                  width: "150px",
                }}
              >
             Preview Menu
              </button></Link>):(<>
                <button
                className="btn text-white"
                style={{
                  backgroundColor: "#99080C",
                  border: "1px solid",
                  borderRadius: "25px",
                  padding: "10px",
                  width: "150px",
                }}
              >
              Get in Touch
              </button>
                </>)}
            </CNavItem>
          </CHeaderNav>
        </CContainer>
        {/* <CHeaderDivider /> */}
        <CContainer fluid></CContainer>
      </CHeader>{" "}
    </AppBar>
  );
};

export default AppHeader;
