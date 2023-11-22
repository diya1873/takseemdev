'use client'
import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Modal, Form, Container, FormControl } from 'react-bootstrap';
import Image from 'next/image';
import axios from 'axios';
import { AiFillCloseCircle, AiOutlineCloudUpload } from 'react-icons/ai';
import Dropzone from 'react-dropzone';
import './categories.css';
const FileDropZone = ({ onDrop, categoryImage, onDelete }) => {
  return (
    <div className="text-center mt-4">
      <Dropzone onDrop={onDrop} accept="image/*" multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            {categoryImage ? (
              <div>
                <Image width={100} height={100} alt='icon' src={categoryImage} roundedCircle className="image-preview" style={{ width: '100px', height: '100px' }} />
                <Button variant="danger" size="sm" className="mt-2" onClick={onDelete}>
                  Delete 
                </Button>
              </div>
            ) : (
              <div>
                <AiOutlineCloudUpload style={{ color: '#a21a1a' }} size={48} className="upload-icon" />
                <p>Drop an image here, or click to select one.</p>
              </div>
            )}
          </div>
        )}
      </Dropzone>
    </div>
  );
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    const restaurantId = window.localStorage.getItem('restaurantId');
    const token = window.localStorage.getItem('token');

    axios
      .get(`http://192.168.1.121:3030/category/list/${restaurantId}`, {
        headers: {
          Authorization: token,
        }
      })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleDeleteCategory = (categoryId) => {
    const token = window.localStorage.getItem('token');

    axios
      .delete(`http://192.168.1.121:3030/category/delete/${categoryId}`, {
        headers: {
          Authorization: token,
        },
        data: {
          token: token,
        },
      })
      .then(() => {
        const updatedCategories = categories.filter(
          (category) => category.id !== categoryId
        );
        setCategories(updatedCategories);
      })
      .catch((error) => {
        console.error('Error deleting category:', error);
      });
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      // Read the binary data of the image file
      const reader = new FileReader();
      reader.onload = (event) => {
        setCategoryImage(event.target.result);
      };
      reader.readAsArrayBuffer(acceptedFiles[0]); // Read the image as an ArrayBuffer
    }
  };

  const handleDeleteImage = () => {
    setCategoryImage(null);
  };

  const resetFormState = () => {
    setCategoryName('');
    setCategoryImage(null);
    setEditCategory(null);
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (categoryName && categoryImage) {
      const token = window.localStorage.getItem('token');
      const data = new FormData();
      data.append('restaurantId', '1');
      data.append('name', categoryName);

      // Append the image as binary data
      data.append('img', new Blob([categoryImage], { type: 'image/*' }));

      axios
        .post('http://192.168.1.121:3030/category/create', data, {
          headers: {
            Authorization: token,
          },
        })
        .then(() => {
          setShowModal(false);
          setCategoryName('');
          setCategoryImage(null);
        })
        .catch((error) => {
          console.error('Error adding category:', error);
        });
    } else {
      alert('Please enter a category name and upload an image.');
    }
  };

  const handleUpdateCategory = () => {
    if (editCategory && categoryName && categoryImage) {
      const token = window.localStorage.getItem('token');
      const data = new FormData();
      data.append('restaurantId', '6');
      data.append('id', editCategory.id);
      data.append('name', categoryName);

      // Append the image as binary data
      data.append('img', new Blob([categoryImage], { type: 'image/*' }));

      axios
        .put(`http://192.168.1.121:3030/category/update/${editCategory.id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
        })
        .then(() => {
          setShowModal(false);
          setCategoryName('');
          setCategoryImage(null);
          setEditCategory(null);
        })
        .catch((error) => {
          console.error('Error updating category:', error);
        });
        resetFormState();

    } else {
      alert('Please enter a category name and upload an image.');
    }
  };

  const handleEditCategory = (category) => {
    setEditCategory(category);
    setShowModal(true);
    
  };
  const handleCloseModal = () => {
    setShowModal(false);
    resetFormState();
  };
  return (
    <div>
      <div className="container p-4 d-flex justify-content-between align-items-center flex-column flex-sm-row">
        <div>
          <p>Total categories: <b>{categories.length}</b></p>
          <b>All Categories</b>
        </div>

        <div>
          <Button variant="danger" onClick={() => setShowModal(true)}>
            + Add Category
          </Button>
        </div>
      </div>

      <Row className="g-3 container m-auto p-4">
        {categories.map((category, index) => (
          <Col key={index} lg={3} md={6} sm={6}>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}></div>
            <Card style={{ borderRadius: '25px' }} className="image-card">
            <Image
            className='card-img-top'
            src={category.img}
            alt="Category Image"
            width={90} // Specify the width you want
            height={300}      // Specify the height you want
            layout="responsive" // Use "responsive" layout for flexible sizing
            objectFit="cover" // Use "cover" for responsive layout
            objectPosition="center" // Adjust as needed
            priority
            style={{ width: '90% !important', margin: '0 auto', borderRadius: '25px',  }}
          />
              <Card.Body style={{ textAlign: 'center' }}>
                <Card.Text> <b>{category.name}</b></Card.Text>
                <Card.Text>Total Products: 5</Card.Text>
                <Button variant="danger">Show All</Button>
                <Button style={{ marginLeft: '-10px' }} variant="warning" onClick={() => handleEditCategory(category)}>
                  Edit
                </Button>
                <Button
                  style={{ marginLeft: '-10px' }}
                  variant="danger"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  <AiFillCloseCircle />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Container className="mt-5">
          <Card className="text-center p-4">
            {editCategory ? (
              <h4 style={{ color: '#a21a1a' }} className="mb-4">Edit Category</h4>
            ) : (
              <h4 style={{ color: '#a21a1a' }} className="mb-4">Add New Category</h4>
            )}

            <Form onSubmit={editCategory ? handleUpdateCategory : handleFormSubmit}>
              <Form.Group controlId="categoryName">
                <Form.Label className="form-label">Category Name</Form.Label>
                <FormControl
                  type="text"
                  placeholder="Enter category name"
                  value={categoryName || (editCategory ? editCategory.name : '')}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="custom-input"
                />
              </Form.Group>
              <br />
              <Form.Label className="form-label">Category Image</Form.Label>
              <br />
              <FileDropZone onDrop={onDrop} categoryImage={categoryImage || (editCategory ? editCategory.img : null)} onDelete={handleDeleteImage} />

              <Button type="submit" variant="danger" className="mt-3 submit-button">
                {editCategory ? 'Update' : 'Save'}
              </Button>
            </Form>
          </Card>
        </Container>
      </Modal>
    </div>
  );
};

export default Categories;
