'use client'

import React, { useState, useEffect } from 'react';
import { Dropdown, InputGroup, FormControl, Button, Modal } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import product from './products.css';
import Link from 'next/link';

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [allCategories, setAllCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Define the truncateDescription function
  const truncateDescription = (description, maxWords) => {
    const words = description.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    } else {
      return description;
    }
  };

  useEffect(() => {
    const restaurantId =  typeof window !== 'undefined' ?localStorage.getItem('restaurantId'): null;
    fetch(`http://192.168.1.121:3030/product/bulk/${restaurantId}`)
      .then((response) => response.json())
      .then((data) => {
        setAllCategories(data.map((categoryData) => categoryData.category));
        setAllProducts(data.map((categoryData) => categoryData.products));
        setCategories(data.map((categoryData) => categoryData.category));
      });
  }, []);

  useEffect(() => {
    // Fetch products again when the component mounts
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    if (categoryFilter !== 'All') {
      const selectedCategory = categories.find((category) => category.name === categoryFilter);
      if (selectedCategory) {
        fetchProductsByCategory(selectedCategory.id);
      }
    } else {
      setProducts(allProducts.flat());
      setSelectedCategory({ name: 'All' });
    }
  };

  const fetchProductsByCategory = (categoryId) => {
    fetch(`http://192.168.1.121:3030/category/products/${categoryId}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        const category = categories.find((cat) => cat.id === categoryId);
        setSelectedCategory(category);
      });
  };

  const handleDelete = (productId) => {
    setShowDeleteModal(true);
    setSelectedProductId(productId);
  };

  const confirmDelete = () => {
    // Close the modal
    setShowDeleteModal(false);

    // Get the token from local storage
    const token =  typeof window !== 'undefined' ?localStorage.getItem('token'): null;

    // Make the POST request with the token in the header
    fetch(`http://192.168.1.121:3030/product/delete/${selectedProductId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Product deleted successfully', data);

        // Update the state to reflect the deletion
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== selectedProductId));

        toast.success('Product deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting product', error);
        toast.error('Error deleting product');
      });
  };

  useEffect(() => {
    fetchProducts(); // Update products when categoryFilter or allProducts changes
  }, [categoryFilter, categories, allProducts]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      fetchProducts(); // Update products when searchTerm changes
    } else {
      const filteredProducts = allProducts
        .flat()
        .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setProducts(filteredProducts);
      setSelectedCategory({ name: 'All' });
    }
  }, [searchTerm, categoryFilter, categories, allProducts]);

  return (
    <div className="container">
      <h1>Product List</h1>
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Dropdown style={{ marginRight: '20px' }}>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Category: {selectedCategory ? selectedCategory.name : ''}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setCategoryFilter('All')}>All</Dropdown.Item>
              {allCategories.map((category) => (
                <Dropdown.Item key={category.id} onClick={() => setCategoryFilter(category.name)}>
                  {category.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <InputGroup className="mb-3 inputsearch">
            <FormControl
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>

        <Button variant="danger">
          <Link style={{ color: 'white', textDecoration: 'none' }} href="/admin/menus/addproduct" variant="danger">
            ADD PRODUCT
          </Link>
        </Button>
      </div>

      {selectedCategory && selectedCategory.name !== 'All' && <h2>{selectedCategory.name}</h2>}

      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img src={product.img} alt={product.name} style={{ minWidth: '80px', maxHeight: '80px' }} />
                </td>
                <td>{product.name}</td>
                <td>{truncateDescription(product.description, 10)}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>
                  <Button style={{ marginRight: '20px' }} variant="warning">
                    <Link style={{ textDecoration: 'none', color: 'black' }} href={`products/edit/${product.id}`}>
                      Edit
                    </Link>
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(product.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
}

export default App;
