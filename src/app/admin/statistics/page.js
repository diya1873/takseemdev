
'use client'
import React from 'react';
import Chart from 'react-google-charts';
import { Container, Row, Col, Card } from 'react-bootstrap';
import css from './statistic.css'
function Dashboard() {
  const salesData = [
    ['Month', 'Sales'],
    ['January', 1000],
    ['February', 1500],
    ['March', 2000],
    ['April', 1200],
    ['May', 1800],
    ['June', 2500],
  ];

  const tableReservationsData = [
    ['Table', 'Table 1', 'Table 2', 'Table 3'],
    ['January', 10, 8, 15],
    ['February', 12, 10, 20],
    ['March', 15, 14, 25],
    ['April', 14, 12, 22],
    ['May', 18, 16, 30],
    ['June', 20, 18, 35],
  ];

  const productSalesData = [
    ['Month', 'Pizza', 'Burger', 'Salad'],
    ['January', 100, 80, 50],
    ['February', 120, 90, 55],
    ['March', 140, 100, 60],
    ['April', 130, 85, 55],
    ['May', 150, 110, 70],
    ['June', 160, 120, 75],
  ];

  const totalOrdersData = [
    ['Month', 'Orders'],
    ['January', 500],
    ['February', 600],
    ['March', 700],
    ['April', 550],
    ['May', 800],
    ['June', 1000],
  ];

  return (
    <Container>
      <Row className="dashboard">
        <Col md={6} className="chart-card">
          <Card>
            <Card.Body>
              <Card.Title>Total Sales</Card.Title>
              <Chart
                width={'100%'}
                height={'300px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={salesData}
                options={{
                  title: 'Total Sales',
                  hAxis: { title: 'Month' },
                  vAxis: { title: 'Sales' },
                }}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="chart-card">
          <Card>
            <Card.Body>
              <Card.Title>Table Reservations</Card.Title>
              <Chart
                width={'100%'}
                height={'300px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart </div>}
                data={tableReservationsData}
                options={{
                  title: 'Table Reservations',
                  hAxis: { title: 'Month' },
                  vAxis: { title: 'Count' },
                  isStacked: true,
                  
                }}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="chart-card">
          <Card>
            <Card.Body>
              <Card.Title>Best Selling Products</Card.Title>
              <Chart
                width={'100%'}
                height={'300px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={productSalesData}
                options={{
                  title: 'Best Selling Products',
                  hAxis: { title: 'Month' },
                  vAxis: { title: 'Sales' },
                
                }}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="chart-card">
          <Card>
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <Chart
                width={'100%'}
                height={'300px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={totalOrdersData}
                options={{
                  title: 'Total Orders',
                  hAxis: { title: 'Month' },
                  vAxis: { title: 'Orders' },
                  
                }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
