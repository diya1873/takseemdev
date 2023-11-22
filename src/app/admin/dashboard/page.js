'use client'

import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { FaDollarSign, FaUser, FaShoppingCart } from 'react-icons/fa';
import './dashboard.css';

const Dashboard = () => {
  const [salesTotal, setSalesTotal] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [trendingOrders, setTrendingOrders] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch token from local storage
        const token = localStorage.getItem('token');

        // Create headers with the token
        const headers = {
          'Authorization': token,
          'Content-Type': 'application/json',
        };

        // Fetch data from the API with headers
        const response = await fetch('http://192.168.1.121:3030/dashboard', {
          method: 'GET',
          headers: headers,
        });

        if (response.ok) {
          const data = await response.json();
          setSalesTotal(data.totalSales || 0);
          setTotalBalance(data.balance || 0);
          setTotalOrders(data.totalOrders || 0);
        } else {
          console.error('API request failed');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      // Fetch trending orders
      try {
        const trendingOrdersResponse = await fetch('http://192.168.1.121:3030/dashboard/top-products', {
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
        });

        if (trendingOrdersResponse.ok) {
          const trendingOrdersData = await trendingOrdersResponse.json();
          setTrendingOrders(trendingOrdersData);
        } else {
          console.error('API request for trending orders failed');
        }
      } catch (error) {
        console.error('Error fetching trending orders:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const tableData = [
    {
      order_id: 1,
      order_name: 'Order 1',
      customer_name: 'Customer 1',
      location: 'Location 1',
      order_status: 'Pending',
      delivered_time: '2 hours',
      price: '$50.00',
    },
    {
      order_id: 2,
      order_name: 'Order 2',
      customer_name: 'Customer 2',
      location: 'Location 2',
      order_status: 'Canceled',
      delivered_time: 'N/A',
      price: '$70.00',
    },
    {
      order_id: 3,
      order_name: 'Order 3',
      customer_name: 'Customer 3',
      location: 'Location 3',
      order_status: 'Delivered',
      delivered_time: '1 hour',
      price: '$70.00',
    },
    // Add more orders as needed
  ];

  const columns = [
    {
      name: 'Order ID',
      selector: (row) => row.order_id,
      sortable: true,
    },
    {
      name: 'Order Name',
      selector: 'order_name',
      sortable: true,
    },
    {
      name: 'Customer Name',
      selector: 'customer_name',
      sortable: true,
    },
    {
      name: 'Location',
      selector: 'location',
      sortable: true,
    },
    {
      name: 'Order Status',
      selector: 'order_status',
      sortable: true,
      cell: (row) => (
        <div
          style={{
            background:
              row.order_status === 'Pending' ? 'red' : row.order_status === 'Canceled' ? 'black' : 'green',
            color: 'white',
            padding: '5px',
            borderRadius: '10px',
            maxWidth: '70px',
            minWidth: '70px',
            textAlign: 'center',
          }}
        >
          {row.order_status}
        </div>
      ),
    },
    {
      name: 'Delivered Time',
      selector: 'delivered_time',
      sortable: true,
    },
    {
      name: 'Price',
      selector: 'price',
      sortable: true,
    },
  ];

  return (
    <div className="container">
      <Row style={{ marginTop: '30px' }}>
        <Col md={4}>
          <Card className="dashboard-card sales-card animated">
            <Card.Body>
              <Card.Title>Sales Total</Card.Title>
              <div className="icon">
                <FaDollarSign />
              </div>
              <Card.Text>{salesTotal}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="dashboard-card visitor-card animated">
            <Card.Body>
              <Card.Title>Total Balance</Card.Title>
              <div className="icon">
                <FaUser />
              </div>
              <Card.Text>{totalBalance}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="dashboard-card orders-card animated">
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <div className="icon">
                <FaShoppingCart />
              </div>
              <Card.Text>{totalOrders}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
<br /><br />
  <br /><br />
  <h2>Trending Orders</h2>
      {/* Trending Orders */}
      <Row style={{ marginTop: '30px' }}>
        {trendingOrders.map((order, index) => (
          <Col md={3} key={index}>
            <Card className="product-card">
              <Card.Img variant="top" src={order.img} />
              <Card.Body>
                <Card.Title>{order.name}</Card.Title>
                <div className="product-info">
                  <p>Orders: <b className='orders'>{order.orders}</b></p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Recently Placed Orders */}
      <div style={{ margin: '20px' }}>
        <DataTable
          title="Recently Placed Orders"
          columns={columns}
          data={tableData}
          pagination
          highlightOnHover
          pointerOnHover
          customStyles={{
            headRow: {
              style: {
                backgroundColor: 'red',
                color: 'white',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
