"use client";
import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Card, Row, Col, Button } from "react-bootstrap";
import "./signup.css";
import Image from "next/image";
import { FaUser, FaLock } from "react-icons/fa"; // Import icons
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Email, Phone } from "@mui/icons-material";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const SignUp = () => {
  const [loading,setLoading]=useState(false)
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile:null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();

    // Create a payload with email and password
    const payload = formData;

    try {
      // Make a POST request to the specified URL using Axios
      const response = await axios.post(
        "http://192.168.1.121:3030/users/contact-form/create",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from server:", response.data);
      console.log("Response from server:", response.status);
      if (response.status === 200) {
        toast.success("successfully Submitted");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          mobile:""
        })
        setLoading(false)
      } else {
        toast.error(response.data.error);
        setLoading(false)

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
            <Row className=" mb-5 mt-5 ">
              <div
                className=" col-md-6 imgcol "
                style={{ backgroundColor: "#ffffff" }}
              >
                <h1 className="fw-bolder m-3">
                  <span>Build Your Career Success </span>
                  <span style={{ color: "#99080C" }}>And Use Taksim</span>
                  <span className="text-warning"> For the journy</span>
                </h1>
                <div className="background-image2  "></div>
              </div>
              <div className=" col-md-5  loginform  justify-content-center align-items-center">
                <div className="text-center">
                  <Image
                    alt="img"
                    src="/images/tq.png"
                    width={200}
                    height={100}
                  />
                </div>
                <h1 className="text-center fw-bolder mt-5">Get In Touch </h1>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <InputGroup>
                      <Form.Control
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        type="text"
                        required
                        placeholder="First Name"
                        className="form-control"
                      />
                      <InputGroup.Text>
                        <FaUser /> {/* Icon for the username input */}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <InputGroup>
                      <Form.Control
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        type="text"
                        required
                        placeholder="Last Name"
                        className="form-control"
                      />
                      <InputGroup.Text>
                        <FaUser />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label> Email</Form.Label>
                    <InputGroup>
                      <Form.Control
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="text"
                        required
                        placeholder="Business Email"
                        className="form-control"
                      />
                      <InputGroup.Text>
                        <Email />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Mobile</Form.Label>
                    <InputGroup>
                      <Form.Control
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        type="number"
                        required
                        placeholder="mobile"
                        className="form-control"
                      />
                      <InputGroup.Text>
                        <Phone />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  <button type="submit" className="w-100 btn loginbtn mt-4">
                   {loading?(<> <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  /></>):"Submit"}
                  </button>
                </Form>
                <p className="mt-3 donThave  ">
                  Already Have an Account?
                  <Link href={`/admin`}> Login</Link>
                </p>
              </div>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
