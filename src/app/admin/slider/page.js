'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import './slider.css';
import Dropzone from 'react-dropzone';
import { toast } from 'react-toastify';
import Image from 'next/image';

const App = () => {
  const [images, setImages] = useState([]);
  const restaurantId = localStorage.getItem('restaurantId');
  const token = localStorage.getItem('token');

  const [showModal, setShowModal] = useState(false);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [radioSelection, setRadioSelection] = useState('empty');
  const [productsAndCategories, setProductsAndCategories] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [sliderToDelete, setSliderToDelete] = useState(null);

  const fetchImages = () => {
    if (restaurantId) {
      axios
        .get(`http://192.168.1.121:3030/slider/list/${restaurantId}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setImages(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    fetchImages();
    if (restaurantId) {
      axios
        .get(`http://192.168.1.121:3030/product/bulk/${restaurantId}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setProductsAndCategories(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [restaurantId, token]);

  useEffect(() => {
    // Log the selectedCategory value when it changes
    console.log('selectedCategory:', selectedCategory);
  }, [selectedCategory]);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0];
      // Check if the file is an image and its size is less than 3MB
      if (file.type.startsWith('image/') && file.size <= 3 * 1024 * 1024) {
        setUploadedImage(file);
      } else {
        toast.error('Please select a valid image file (max size: 3MB).');
      }
    } else {
      toast.error('Please select only one image file.');
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setSelectedCategory(null);
    setRadioSelection('empty');
    setUploadedImage(null);
  };

  const openDeleteConfirmationModal = (sliderId) => {
    setSliderToDelete(sliderId);
    setDeleteConfirmationModal(true);
  };

  const closeDeleteConfirmationModal = () => {
    setSliderToDelete(null);
    setDeleteConfirmationModal(false);
  };

  const handleRadioChange = (event) => {
    setRadioSelection(event.target.value);
  };

  const addSlider = () => {
    console.log('Adding a new slider', radioSelection, selectedProduct, selectedCategory);

    const formData = new FormData();
    formData.append('type', radioSelection === 'empty' ? 1 : radioSelection === 'category' ? 2 : 3);
    formData.append('targetId', radioSelection === 'empty' ? null : radioSelection === 'category' ? selectedCategory : selectedProduct);
    formData.append('img', uploadedImage);

    axios
      .post(`http://192.168.1.121:3030/slider/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      })
      .then((response) => {
        console.log('Slider created successfully', response.data);
        toast.success('Slider created successfully');
        closeModal();
        fetchImages(); // Fetch and update the images after adding
      })
      .catch((error) => {
        console.error('Error creating slider', error);
        toast.error('Please fill all inputs');
        if (error.response) {
          console.log('Server Response Data:', error.response.data);
          console.log('Server Response Status:', error.response.status);
        }
      });
  };

  const deleteSlider = () => {
    if (sliderToDelete) {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const requestBody = {
        token: token,
      };

      axios
        .delete(`http://192.168.1.121:3030/slider/delete/${sliderToDelete}`, {
          data: requestBody,
        })
        .then((response) => {
          console.log(`Slider with ID ${sliderToDelete} deleted successfully`, response.data);
          toast.success('Slider deleted successfully');
          fetchImages(); // Fetch and update the images after deleting
        })
        .catch((error) => {
          console.error('Error deleting slider', error);
          if (error.response) {
            console.log('Server Response Data:', error.response.data);
            console.log('Server Response Status:', error.response.status);
          }
        });
    }

    setSliderToDelete(null);
    setDeleteConfirmationModal(false);
  };

  return (
    <div className="appStyles">
      <h1 className="slider-title">Menu Sliders</h1>
      <div className="container" style={{ textAlign: 'right', marginBottom: '10px' }}>
        <Button variant="primary" onClick={openModal}>
          + Add Slider
        </Button>
      </div>
      <div className="card-container">
        {images.map((image) => (
          <Card key={image.id} className="image-card">
          <Image
          src={image.img}
          alt={image.alt}
          width={150} // Specify the width you want
          height={300} // Fixed height for all images
          layout="responsive"
          objectFit="cover"
          objectPosition="center"
          priority
        />
            <Card.Body>
              <Button
                className="delete-button"
                onClick={() => openDeleteConfirmationModal(image.id)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Slider</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Check
              type="radio"
              label="Product"
              name="radioSelection"
              value="product"
              id="productRadio"
              checked={radioSelection === 'product'}
              onChange={handleRadioChange}
            />
            <Form.Check
              type="radio"
              label="Category"
              name="radioSelection"
              id="categoryRadio"
              value="category"
              checked={radioSelection === 'category'}
              onChange={handleRadioChange}
            />
            <Form.Check
              type="radio"
              label="Empty"
              name="radioSelection"
              id="emptyRadio"
              value="empty"
              checked={radioSelection === 'empty'}
              onChange={handleRadioChange}
            />
            {radioSelection === 'product' && productsAndCategories.length > 0 && (
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-products">
                  {selectedProduct !== null
                    ? productsAndCategories
                        .flatMap((item) => item.products)
                        .find((product) => product.id === selectedProduct).name
                    : 'Select Product'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {productsAndCategories.map((item) =>
                    item.products.map((product) => (
                      <Dropdown.Item
                        key={product.id}
                        onClick={() => setSelectedProduct(product.id)}
                      >
                        {product.name}
                      </Dropdown.Item>
                    ))
                  )}
                </Dropdown.Menu>
              </Dropdown>
            )}
            {radioSelection === 'category' && productsAndCategories.length > 0 && (
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-categories">
                  {selectedCategory !== null
                    ? productsAndCategories.find((item) => item.category.id === selectedCategory).category.name
                    : 'Select Category'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {productsAndCategories.map((item) => (
                    <Dropdown.Item
                      key={item.category.id}
                      onClick={() => setSelectedCategory(item.category.id)}
                    >
                      {item.category.name}
                    </Dropdown.Item>
            ))}
                  {productsAndCategories.length === 0 && ( // Check if no products found
                    <Dropdown.Item as={Link} to={addProductLink}>
                      Add Product
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            )}
            <br></br>
            <Dropzone onDrop={onDrop} accept="image/*" maxSize={3 * 1024 * 1024} maxFiles={1} multiple={false}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()}  multiple={false}/>
                  {uploadedImage ? (
                    <div>
                      <p>Selected Image:</p>
                      <img src={URL.createObjectURL(uploadedImage)} alt="Selected" className="selected-image" />
                    </div>
                  ) : (
                    <p>Drag and drop some image files here, or click to select image files (max size: 3MB).</p>
                  )}
                </div>
              )}
            </Dropzone>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={addSlider}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={deleteConfirmationModal} onHide={closeDeleteConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this slider?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteConfirmationModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteSlider}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;
