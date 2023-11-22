'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Dropdown,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import './Addproduct.css';
import Dropzone from 'react-dropzone';

function AddProductForm() {
  const [product, setProduct] = useState({
    productName: '',
    category: '',
    price: '',
    salePrice: '',
    description: '',
    variants: [],
    mainImage: null,
    additionalImages: [],
  });

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  useEffect(() => {
    const restaurantId =  typeof window !== 'undefined' ?localStorage.getItem('restaurantId'): null;
    // Fetch categories from the API
    axios
      .get(`http://192.168.1.121:3030/category/list/${restaurantId}`)
      .then((response) => {
        const categories = response.data;
        // Set the category options based on the API response
        setCategoryOptions(categories);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCategoryChange = (selectedCategory) => {
    setProduct({ ...product, category: selectedCategory });

    // Find the ID of the selected category
    const selectedCategoryObject = categoryOptions.find((category) => category.name === selectedCategory);
    if (selectedCategoryObject) {
      setSelectedCategoryId(selectedCategoryObject.id);
    } else {
      setSelectedCategoryId(''); // Reset the category ID if no category is selected
    }
  };

  const handleAddNewVariant = () => {
    setProduct({
      ...product,
      variants: [
        ...product.variants,
        {
          title: '', // Set a default title to an empty string
          type: 'radio', // Default to 'radio'
          options: [{ name: '', price: '' }],
        },
      ],
    });
  };

  const handleAddOption = (variantIndex) => {
    const updatedVariants = [...product.variants];
    updatedVariants[variantIndex].options.push({ name: '', price: '' });
    setProduct({ ...product, variants: updatedVariants });
  };

  const onDropMainImage = (acceptedFiles) => {
    setProduct({ ...product, mainImage: acceptedFiles[0] });
  };

  const onDropAdditionalImages = (acceptedFiles) => {
    const updatedAdditionalImages = [...product.additionalImages];

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const binaryData = new Uint8Array(reader.result);

        updatedAdditionalImages.push({
          name: file.name,
          data: binaryData,
        });

        setProduct({
          ...product,
          additionalImages: updatedAdditionalImages,
        });
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const handleDeleteAdditionalImage = (index) => {
    const updatedImages = [...product.additionalImages];
    updatedImages.splice(index, 1);
    setProduct({ ...product, additionalImages: updatedImages });
  };

  useEffect(() => {
    if (product.variants.some((variant) => variant.type === 'radio')) {
      setProduct({ ...product, price: '0' });
    } else if (product.price === '0') {
      setProduct({ ...product, price: '' });
    }
  }, [product.variants]);

  const handleSubmit = () => {
    const token =  typeof window !== 'undefined' ?localStorage.getItem('token'): null;
    const formData = new FormData();

    formData.append('name', product.productName);
    formData.append('description', product.description);
    formData.append('price', parseFloat(product.price));
    formData.append('categoryId', selectedCategoryId);
    formData.append('path', 'path');
    // formData.append('token', token);
    formData.append('variations', JSON.stringify(product.variants));

    formData.append('img', product.mainImage);
//- this code for convert images to bainary syntax -
    product.additionalImages.forEach((file, index) => {
      const { data, type, name } = file;
      formData.append(`images`, new Blob([data], { type }), name);
      
    });
    

    axios
      .post('http://192.168.1.121:3030/product/create', formData, {
        headers: {
          'Authorization':  token,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('Product created:', response.data);
        setProduct({
          productName: '',
          category: '',
          price: '',
          salePrice: '',
          description: '',
          variants: [],
          mainImage: null,
          additionalImages: [],
        });
        setSelectedCategoryId('');
      })
      .catch((error) => {
        console.error('Error creating product:', error);
      });
  };

  return (
    <Container>
      <br />
      <Form className="form">
        <Row>
          <Col md={12}>
            <Form.Group controlId="productName">
              <Form.Label className="form-label">Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={product.productName}
                onChange={(e) =>
                  setProduct({ ...product, productName: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label className="form-label">Select Category</Form.Label>
              <Dropdown onSelect={handleCategoryChange}>
                <Dropdown.Toggle as={InputGroup}>
                  <FormControl
                    type="text"
                    placeholder="Select category"
                    value={product.category}
                    readOnly
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categoryOptions.map((category) => (
                    <Dropdown.Item
                      key={category.id}
                      eventKey={category.name}
                    >
                      {category.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label className="form-label">Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                disabled={
                  product.variants.some((variant) => variant.type === 'radio')
                }
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label className="form-label">Product Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter product description"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group>
          <Form.Label style={{ margin: '20px 10px' }} className="form-label">
            Product Variants
          </Form.Label>
          {product.variants.map((variant, variantIndex) => (
            <div key={variantIndex} className="variant-form">
              <Form.Group>
                <Form.Label className="form-label">Variant Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter variant name"
                  value={variant.title} 
                  onChange={(e) => {
                    const updatedVariants = [...product.variants];
                    updatedVariants[variantIndex].title = e.target.value; {/* Change name to title */}
                    setProduct({ ...product, variants: updatedVariants });
                  }}
                />
              </Form.Group>

              {/* Dropdown for option type (radio or checkbox) */}
              <Form.Group>
                <Form.Label className="form-label">Option Type</Form.Label>
                <Dropdown
                  onSelect={(selectedType) => {
                    const updatedVariants = [...product.variants];
                    updatedVariants[variantIndex].type = selectedType;
                    setProduct({ ...product, variants: updatedVariants });
                  }}
                >
                  <Dropdown.Toggle as={InputGroup}>
                    <FormControl
                      type="text"
                      placeholder="Select option type"
                      value={variant.type}
                      readOnly
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="radio">Radio</Dropdown.Item>
                    <Dropdown.Item eventKey="checkbox">Checkbox</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              <Form.Group>
                <Form.Label className="form-label">Options</Form.Label>
                {variant.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="option-form">
                    <Form.Group>
                      <Form.Label className="form-label">Option Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter option name"
                        value={option.name}
                        onChange={(e) => {
                          const updatedVariants = [...product.variants];
                          updatedVariants[variantIndex].options[optionIndex].name =
                            e.target.value;
                          setProduct({ ...product, variants: updatedVariants });
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="form-label">Option Price</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter option price"
                        value={option.price}
                        onChange={(e) => {
                          const updatedVariants = [...product.variants];
                          updatedVariants[variantIndex].options[optionIndex].price =
                            e.target.value;
                          setProduct({ ...product, variants: updatedVariants });
                        }}
                      />
                    </Form.Group>
                  </div>
                ))}
                <Button
                  variant="danger"
                  onClick={() => handleAddOption(variantIndex)}
                >
                  Add Option
                </Button>
              </Form.Group>
            </div>
          ))}
          <Button variant="danger" onClick={handleAddNewVariant}>
            Add New Variant
          </Button>
        </Form.Group>

        <Col md={6}>
          <Form.Group>
            <Form.Label className="form-label">Main Product Image</Form.Label>
            <div className="dropzone">
              <Dropzone onDrop={onDropMainImage}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className="dropzone-content">
                    <input {...getInputProps()} />
                    <p>Drag & drop or click to select a file</p>
                    {product.mainImage && (
                      <img
                        className="innerimage"
                        src={URL.createObjectURL(product.mainImage)}
                        alt="Main Product"
                      />
                    )}
                  </div>
                )}
              </Dropzone>
            </div>
          </Form.Group>

          <Form.Group>
            <Form.Label className="form-label">Additional Images</Form.Label>
            <div className="dropzone">
              <Dropzone onDrop={onDropAdditionalImages} multiple>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className="dropzone-content">
                    <input {...getInputProps()} />
                    <p>Drag & drop or click to select files</p>
                    <div className="preview">
                      {product.additionalImages.map((file, index) => (
                        <div key={index} className="image-preview">
                          <img
                            className="innerimage"
                            src={URL.createObjectURL(
                              new Blob([file.data], { type: 'image/jpeg' })
                            )}
                            alt={`Image ${index}`}
                          />
                          <button
                            onClick={() => handleDeleteAdditionalImage(index)}
                            className="delete-button"
                          >
                            x
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Dropzone>
            </div>
          </Form.Group>
        </Col>

        <Button variant="danger" onClick={handleSubmit}>
          Add Product
        </Button>
      </Form>
    </Container>
  );
}

export default AddProductForm;
