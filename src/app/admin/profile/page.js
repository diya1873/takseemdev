'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './profile.css';
import Image from 'next/image';

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Loading...',
    mobile: 'Loading...',
    email: 'Loading...',
  });
  const [token, setToken] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState('');

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    setToken(userToken);

    axios
      .get(`http://192.168.1.121:3030/users/info?token=${userToken}`)
      .then((response) => {
        const data = response.data;
        setUserInfo(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handlePasswordReset = async () => {

    const userToken = localStorage.getItem('token');
    setToken(userToken);
    const data = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      token: userToken,
    };

    try {
        console.log('token' , token)
      const response = await axios.post(
        `http://192.168.1.121:3030/users/update-password`,
        data
      );

      if (response.status === 200) {
        setResetSuccess(true);
        setResetError('');
      } else {
        setResetSuccess(false);
        setResetError('Failed to reset password');
      }
    } catch (error) {
      console.error('Error:', error);
      setResetSuccess(false);
      setResetError('Failed to reset password');
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="cover-image">
          <Image
          src="https://indiater.com/wp-content/uploads/2019/01/Free-Food-Facebook-Cover-990x357.jpg"
          alt="Cover Image"
          width={100}
          height={100}
          layout="responsive"
          objectFit="cover" // Use "cover" for responsive layout
          objectPosition="center" // Adjust as needed
        />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="circle-profile-image">
          <Image
          src="https://user-images.githubusercontent.com/5709133/50445980-88299a80-0912-11e9-962a-6fd92fd18027.png"
          alt="Cover Image"
          width={100}
          height={100}
          layout="responsive"
          objectFit="cover" // Use "cover" for responsive layout
          objectPosition="center" // Adjust as needed
        />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="profile-info">
            <h2>Name: {userInfo.name}</h2>
            <p>Email: {userInfo.email}</p>
            <p>Phone Number: {userInfo.mobile}</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Change Password</h3>
          {resetSuccess && <div className="success-message">Password reset successful</div>}
          {resetError && <div className="error-message">{resetError}</div>}
          <Form>
            <Form.Group controlId="currentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              className="button-52"
              role="button"
              variant="secondary"
              size="sm"
              onClick={handlePasswordReset}
            >
              Reset Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
