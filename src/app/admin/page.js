"use client";
import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import { Card, Row, Col, Button } from "react-bootstrap";
import backgroundImage from "../../../public/images/resturant.png"; // Replace with the URL of your background image
import "./global.css";
import Image from "next/image";
import { FaUser, FaLock } from "react-icons/fa"; // Import icons
import Link from "next/link";
import Re from "./recaptcha";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSideBarContext } from "../../components/context/sidebar";
import { useOwnerSideBarContext } from "../../components/context/ownersidebar";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    isCollabsled,
    setIsCollabsled,
    isClosed,
    setIClosed,
    setIsUserLogedIn,
    isUserLogedIn,
  } = useSideBarContext();
  const {
    isCollabsled2,
    setIsCollabsled2,
    isClosed2,
    setIClosed2,
    setIsUserLogedIn2,
    isUserLogedIn2,
  } = useOwnerSideBarContext();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a payload with email and password
    const payload = {
      email: email,
      password: password,
    };

    try {
      // Make a POST request to the specified URL using Axios
      const response = await axios.post(
        "http://192.168.1.121:3030/users/login",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      
      // console.log("Response from server:", response.status);
     
      if (response.status === 200) {
     
        toast.success("successfully login");
        typeof window !== 'undefined' ?window.localStorage.setItem("token", response.data.token): null;
        typeof window !== 'undefined' ? window.localStorage.setItem("restaurantId", response.data.restaurantId): null;
       

        if(response.data.role==="owner"){
          setIsUserLogedIn2(true)
          setIClosed2(false)
          router.push('/owner')
           
        } else{
          setIsUserLogedIn(true)
          setIClosed(false)
          router.push("/admin/dashboard");
        }
      } else {
        toast.error(response.data.error);
      }
      // You can handle the response data as needed
    } catch (error) {
      toast.error(error);
      toast.error("Error:", "please check email or password");
    }
  };

  <script src="https://www.google.com/recaptcha/api.js" async defer></script>;
  return (
    <div className="login-page  ">
      <Row
        className="justify-content-center align-items-center p-0 m-0 mainrow"
        style={{ minHeight: "100vh" }}
      >
        <Col md={10}>
          <div>
            <Row className="  ">
              <div
                className=" col-md-6 imgcol "
                style={{ backgroundColor: "#99080C" }}
              >
                <div className="background-image   "></div>
                <h4 className="text-white ms-4 text-center">
                  You are one Step away to make have Amazing Splitting journey.
                </h4>
              </div>
              <div className=" col-md-5  loginform  justify-content-center align-items-center">
                <div className="text-center">
                  <Image
                    alt="img"
                    src="/images/taqseem.png"
                    width={100}
                    height={100}
                  />
                </div>
                <h1 className="text-center fw-bolder mt-5">Signin</h1>
                <Form >
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      <Form.Control
                        value={email}
                        onChange={handleEmailChange}
                        type="email"
                        name="Email"
                        required
                        placeholder="Email"
                        className="form-control"
                      />
                      <InputGroup.Text>
                        <FaUser /> {/* Icon for the username input */}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        value={password}
                        onChange={handlePasswordChange}
                        type="password"
                        name="password"
                        required
                        placeholder="Password"
                      />
                      <InputGroup.Text>
                        <FaLock /> {/* Icon for the password input */}
                      </InputGroup.Text>
                    </InputGroup>
                    <Link href="/" className="float-end">
                      Forget password ?
                    </Link>
                  </Form.Group>
                  <Re />
                  <button
                    onClick={handleSubmit}
                    
                    className="w-100 btn loginbtn mt-4 "
                  >
                    Continue
                  </button>
                </Form>
                <p className="mt-3 donThave  ">
                  Dont have a Portal account yet?{" "}
                  <Link href={`/singup`}> Sign up</Link>
                </p>

              </div>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
