"use client";
import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Image from "next/image";
import "../NavBarc.css";
import { Drawer } from "antd";
import { useCategoriestData } from "../../context/categories";
import { useResturantData } from "../../context/resturant";
import { useProductsData } from "../../context/products";
import { useRouter } from 'next/navigation'

const Navigation = ({

  isMobileDrawerVisible,
  setMobileDrawerVisible,
  showMobileDrawer,
  closeMobileDrawer,
}) => {
  const router = useRouter()
  const [size, setSize] = useState();


  useEffect(() => {
    // Get the initial window width
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      // Update the size state based on the screen width
      setSize(windowWidth <= 767 ? "75%" : "40%");
    };

    // Add a resize event listener
    window.addEventListener("resize", handleResize);

    // Call the handleResize function to set the initial size
    handleResize();

    // Cleanup by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { resturantData } = useResturantData();
  const {categoriesData}  = useCategoriestData();
  const { setCategoryId } = useProductsData();
  const handleFilterProducts = (id) => {
    router.push('/resturant')
    setCategoryId(id);
    closeMobileDrawer()
  }
  return (
    <div>
      {/* For Mobile */}

      <Drawer
        width={size} // Set the width based on the size state
        title={
          <div style={{ height: "100px" }}>
            <div className="d-flex justify-content-center">
              {resturantData?.map((resturant) => {
                return (
                  <>
                    <img
                      src={resturant.logo}
                      alt="KFC Logo"
                      width={50}
                      height={50}
                    />
                  </>
                );
              })}
            </div>
            <br />
            {resturantData?.map((resturant) => {
              return (
                <>
                  <h6 className="mt-3 text-center text-dark">
                    {resturant.name}
                  </h6>
                </>
              );
            })}
          </div>
        }
        placement="right"
        closable={true}
        onClose={closeMobileDrawer}
        open={isMobileDrawerVisible}
      >
        <div className="mt-4">
          <Nav.Link>
            <h5 className="mt-5 mb-3">Menu Categories</h5>
          </Nav.Link>
         
          <hr />

          {categoriesData?.map((category) => {
            return (
              <>
                <Nav.Link   onClick={()=>handleFilterProducts(category.id)}>
                  <span className="ms-2 category-item2"  >
                    {" "}
                    <img
                      src={category.img}
                      alt="trending"
                      width={40}
                      height={40}
                    />
                  </span>
                  <small className="mt-5 fw-bolder ms-4 h4">
                    {category.name}
                  </small>
                </Nav.Link>
                <hr />
              </>
            );
          })}
        </div>
      </Drawer>
    </div>
  );
};

export default Navigation;
