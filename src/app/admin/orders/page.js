'use client'

import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';


const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setError('Authentication token not found in local storage');
          return;
        }

        const apiUrl = 'http://192.168.1.121:3030/order/all';

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: token,
          },
        });

        if (response.status === 200) {
          const formatCreatedAt = (date) => {
            const formattedDate = new Date(date).toISOString().slice(0, 10);
            const formattedTime = new Date(date).toISOString().slice(11, 16);
            return `${formattedDate} - ${formattedTime}`;
          };
          const mappedData = response.data.map((item) => ({
            id: item.id,
            tableId: item.tableId,
            note: item.note || 'N/A',
            status: getStatus(item.status),
            createdAt: formatCreatedAt(item.createdAt),
            products: item.products || [],
          }));

          setOrders(mappedData);
        } else {
          setError(`API request failed with status code: ${response.status}`);
        }
      } catch (err) {
        setError(`Error fetching data: ${err.message}`);
      }
    };

    fetchData();
  }, []);

  const getStatus = (status) => {
    if (status === null || status === 0) {
      return 'Pending';
    } else if (status === 1) {
      return 'Fulfilled';
    } else if (status === 2) {
      return 'Cancelled';
    }
    return 'Unknown';
  };

  const handleRowClicked = (row) => {
    setSelectedOrder(row);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const handleChangeStatus = async (newStatusValue) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Authentication token not found in local storage');
        return;
      }

      const apiUrl = `http://192.168.1.121:3030/order/status/${selectedOrder.id}`;
      const requestBody = {
        newStatus: newStatusValue,
      };

      const response = await axios.put(apiUrl, requestBody, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === selectedOrder.id ? { ...order, status: getStatus(newStatusValue) } : order
          )
        );
      } else {
        setError(`Failed to update status. Status code: ${response.status}`);
      }
    } catch (err) {
      setError(`Error updating status: ${err.message}`);
    }

    setSelectedOrder(null);
  };


  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return { backgroundColor: 'red', color: 'white', padding:'5px',  textDecoration: 'none',minWidth:'100px'  };
      case 'Fulfilled':
        return { backgroundColor: 'green', color: 'white' ,padding:'5px', textDecoration: 'none', minWidth:'100px' };
      case 'Cancelled':
        return { backgroundColor: 'black', color: 'white', padding:'5px', textDecoration: 'none'  ,minWidth:'100px' };
      default:
        return {}; // Default styling
    }
  };

  const columns = [
    {
      name: 'ID',
      selector: 'id',
      sortable: true,
      maxWidth: '120px',
    },
    {
      name: 'Table ID',
      selector: 'tableId',
      sortable: true,
      maxWidth: '120px',
    },
    {
      name: 'Note',
      selector: 'note',
      sortable: true,
      maxWidth: '850px',
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      maxWidth: '250px',
      cell: (row) => (
        <Button 
          variant="link"
          style={getStatusStyle(row.status) }
          onClick={() => handleRowClicked(row)}
        >
          {row.status}
        </Button>
      ),

    },
    {
      name: 'Created At',
      selector: 'createdAt',
      sortable: true,
      maxWidth: '160px',
    },
  ];

  return (
    <Container>
    <br></br>
      {error ? (
        <p>{error}</p>
      ) : (
        <DataTable
          title="Order Table"
          columns={columns}
          data={orders}
          onRowClicked={handleRowClicked}
          pagination
          paginationPerPage={15}
         
          customStyles={{
            headRow: {
              style: {
                backgroundColor: 'red',
                color: 'white',
              },
            },
          }}
        />
      )}

      {selectedOrder && (
        <OrderModal order={selectedOrder} onClose={closeModal} onStatusChange={handleChangeStatus} />
      )}
    </Container>
  );
};

const OrderModal = ({ order, onClose, onStatusChange }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemsError, setItemsError] = useState(null);

  useEffect(() => {
    if (order.id) {
      fetchOrderItems(order.id);
    }
  }, [order.id]);

  const fetchOrderItems = async (orderId) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setItemsError('Authentication token not found in local storage');
        return;
      }

      setLoading(true);
      const apiUrl = `http://192.168.1.121:3030/order/items/${orderId}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        setOrderItems(response.data);
      } else {
        setItemsError(`API request failed with status code: ${response.status}`);
      }
    } catch (err) {
      setItemsError(`Error fetching order items: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal size="xl" show={true} onHide={onClose} dialogClassName="modal-90w">
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <strong>ID:</strong> {order.id}
          </Col>
          <Col md={6}>
            <strong>Table ID:</strong> {order.tableId}
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <strong>Note:</strong> {order.note}
          </Col>
          <Col md={6}>
            <strong>Status:</strong> {order.status}
          </Col>
        </Row>
        <hr />
        <strong>Products :</strong>
        <table className="table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item, index) => (
              <tr key={index}>
                <td>
                  {item.productName},{' '}
                  {item.variationsValue
                    .map((variation) => `${variation.key}: ${variation.value.join(', ')}`)
                    .join(', ')}
                </td>
                <td>{item.quantity}</td>
                <td>{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button style={{background:'green', color:'white'}}
          variant=""
          onClick={() => onStatusChange(1)}
        >
          Mark as Fulfilled
        </Button>
        <Button style={{background:'red', color:'white'}}
          variant=""
          onClick={() => onStatusChange(0)}
        >
          Mark as Pending
        </Button>
        <Button style={{background:'black', color:'white'}}
          variant=""
          onClick={() => onStatusChange(2)}
        >
          Mark as Cancelled
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderTable;
