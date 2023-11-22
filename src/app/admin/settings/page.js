'use client'
import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './page.css';
import Image from 'next/image';

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: 'Loading...',
    about: '',
    header_bgColor: 'black',
    menu_bgColor: 'white',
    fontColor: 'white',
    tax: 0.16,
    serviceFees: 0.05,
  });

  const [dynamicName, setDynamicName] = useState('');
  const [dynamicAbout, setDynamicAbout] = useState('');
  const [dynamicTax, setDynamicTax] = useState(0);
  const [dynamicFees, setDynamicFees] = useState(0);
  const [headerColor, setHeaderColor] = useState('black');
  const [menuColor, setMenuColor] = useState('white');
  const [textColor, setTextColor] = useState('white');
  const [logoImage, setLogoImage] = useState(null);

  useEffect(() => {
    // Get the restaurantId from local storage
    const restaurantId = window.localStorage.getItem('restaurantId');

    // Fetch restaurant data from the API
    axios
      .get(`http://192.168.1.121:3030/restaurant/list/${restaurantId}`)
      .then((response) => {
        const data = response.data[0];
        setRestaurantInfo(data);
        setDynamicName(data.name);
        setDynamicAbout(data.about);
        setDynamicTax(data.tax);
        setDynamicFees(data.serviceFees);
        setHeaderColor(data.header_bgColor);
        setMenuColor(data.menu_bgColor);
        setTextColor(data.fontColor);
      })
      .catch((error) => {
        console.error('Error fetching restaurant data:', error);
      });
  }, []);

  const handleUpdate = async () => {
    const token = window.localStorage.getItem('token');

    const data = {
      name: dynamicName,
      about: dynamicAbout,
      tax: dynamicTax,
      serviceFees: dynamicFees,
      header_bgColor: headerColor,
      menu_bgColor: menuColor,
      fontColor: textColor,
      token: token,
    };

    try {
      const response = await axios.put(
        `http://192.168.1.121:3030/restaurant/update?token=${token}`,
        data
      );

      if (response.status === 200) {
        setRestaurantInfo({
          ...restaurantInfo,
          name: dynamicName,
          about: dynamicAbout,
          tax: dynamicTax,
          serviceFees: dynamicFees,
          header_bgColor: headerColor,
          menu_bgColor: menuColor,
          fontColor: textColor,
        });

        // Clear the logoImage state
        setLogoImage(null);

        // Set edit mode to false
        setEditMode(false);

        console.log('Updated restaurant info:', restaurantInfo);
      } else {
        console.error('Failed to update restaurant information');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setLogoImage(file);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'name') {
      setDynamicName(value);
    } else if (name === 'about') {
      setDynamicAbout(value);
    } else if (name === 'tax') {
      setDynamicTax(parseFloat(value));
    } else if (name === 'serviceFees') {
      setDynamicFees(parseFloat(value));
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
            <input
              type="file"
              name="circleImage"
              accept="image/*"
              onChange={handleImageChange}
            />
            <Button
              className="edit-button"
              variant="secondary"
              size="sm"
              onClick={() =>
                document.querySelector('input[name="circleImage"]').click()
              }
            >
              Edit
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button style={{marginBottom:'30px'}}
            variant="secondary"
            size="sm"
            onClick={() => setEditMode(!editMode)}
            className='button-52'
            class="button-52" role="button"
          >
            {editMode ? 'View' : 'Edit Info'}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            {editMode ? (
              <Form>
                <Form.Group controlId="restaurantName">
                  <Form.Label>Restaurant Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={dynamicName}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="restaurantAbout">
                  <Form.Label>About Restaurant</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="about"
                    value={dynamicAbout}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="tax">
                  <Form.Label>Tax (%)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="tax"
                    value={dynamicTax}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="serviceFees">
                  <Form.Label>Fees</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="serviceFees"
                    value={dynamicFees}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="headerColor">
                  <Form.Label>Header Background Color</Form.Label>
                  <input
                    type="color"
                    name="header_bgColor"
                    value={headerColor}
                    onChange={(e) => setHeaderColor(e.target.value)}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="menuColor">
                  <Form.Label>Menu Background Color</Form.Label>
                  <input
                    type="color"
                    name="menu_bgColor"
                    value={menuColor}
                    onChange={(e) => setMenuColor(e.target.value)}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="textColor">
                  <Form.Label>Text Color</Form.Label>
                  <input
                    type="color"
                    name="fontColor"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    readOnly
                  />
                </Form.Group>
                <Button style={{color:'white'}} className="button-52" role="button" variant="secondary" size="sm" onClick={handleUpdate}>
                  Save
                </Button>
                <br></br>
                <br></br>
                <br></br>
              </Form>
            ) : (
              <div>
                <h2>{restaurantInfo.name}</h2>
                <p style={{ overflowWrap: 'break-word' }}>{restaurantInfo.about}</p>
                <p>
                  <b>Tax:</b> {restaurantInfo.tax}% 
                </p>
                <p>
                  <b>Fees:</b> {restaurantInfo.serviceFees} 
                </p>
               


              <div style={{display:'flex', justifyContent:'space-around'}}>
              Header Background Color:{' '}
              <input type="color" value={restaurantInfo.header_bgColor} disabled />

              Menu Background Color:{' '}
              <input type="color" value={restaurantInfo.menu_bgColor} disabled />
              Text Color: <input type="color" value={restaurantInfo.fontColor} disabled />
              <br></br>
              <br></br>
              <br></br>
              </div>

              </div>



            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
