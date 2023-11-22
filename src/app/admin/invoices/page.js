"use client";
import { Menu } from 'antd';
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { CiMenuKebab } from "react-icons/ci";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, message, Space, Tooltip } from "antd";
import "./tables.css";
import { FaEye } from "react-icons/fa";
import { useRouter } from 'next/navigation'; 

const Invoices = () => {
  const router=useRouter()
  const handleMenuClick = (e, row) => {
  if (e.key === '1') {
    // When "Show Details" is clicked, log the row details
    console.log('Row details:', row);
    router.push(`/admin/invoices/${row.id}`)
  } else {
    message.info('Click on menu item.');
    console.log('click', e);
  }
};

  const dummyData = [
    {
      id: 4,
      tableId: 104,
      status: "Paid",
      Order: "Order 4",
      "Total Price": "$65",
      createdAt: "2023-11-18",
    },
    {
      id: 5,
      tableId: 105,
      status: "Unpaid",
      Order: "Order 5",
      "Total Price": "$90",
      createdAt: "2023-11-19",
    },
    {
      id: 6,
      tableId: 106,
      status: "Cancelled",
      Order: "Order 6",
      "Total Price": "$75",
      createdAt: "2023-11-20",
    },
  ];

  const items = [
    {
      label: "Show Details",
      key: "1",
     
    },
    {
      label: "Payments",
      key: "2",
    
    },
    {
      label: "Print",
      key: "3",
      
     
    }
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  const [invoices, setInvoices] = useState(dummyData);
  const [selectedRow, setSelectedRow] = useState(null);
  const [error, setError] = useState(null);

  const getStatus = (status) => {
    if (status === null || status === 0) {
      return "Pending";
    } else if (status === 1) {
      return "Fulfilled";
    } else if (status === 2) {
      return "Cancelled";
    }
    return "Unknown";
  };

  const handleRowClicked = (row) => {
    setSelectedRow(row);
  };

  const closeModal = () => {
    setSelectedRow(null);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Cancelled":
        return {
          backgroundColor: "red",
          color: "white",
          padding: "5px",
          textDecoration: "none",
          minWidth: "100px",
        };
      case "Paid":
        return {
          backgroundColor: "green",
          color: "white",
          padding: "5px",
          textDecoration: "none",
          minWidth: "100px",
        };
      case "Unpaid":
        return {
          backgroundColor: "black",
          color: "white",
          padding: "5px",
          textDecoration: "none",
          minWidth: "100px",
        };
      default:
        return {}; // Default styling
    }
  };

  const columns = [
    {
      name: "Invoice Id",
      selector: "id",
      sortable: true,
      width: "170px",
    },
    {
      name: "Table Number",
      selector: "tableId",
      sortable: true,
      width: "170px",
    },

    {
      name: "Payment Status",
      selector: "status",
      sortable: true,
      width: "180px",
      cell: (row) => (
        <span
          variant="link"
          
          onClick={() => handleRowClicked(row)}
        >
         <span style={getStatusStyle(row.status)}> {row.status}</span>
        </span>
      ),
    },
    {
      name: "Order",
      selector: "Order ",
      sortable: true,
      width: "170px",
      cell: (row) => (
        <Space>
          <FaEye className="h4 text-primary" />
        </Space>
      ),
    },
    {
      name: "Total Price",
      selector: "Total Price",
      sortable: true,
      width: "170px",
    },
    {
      name: "Date",
      selector: "createdAt",
      sortable: true,
      width: "170px",
    },
    {
      name: "Actions",
      selector: "Actions",
      sortable: true,
      cell: (row) => (
        <Dropdown
          overlay={(
            <Menu onClick={(e) => handleMenuClick(e, row)}>
              {items.map(item => (
                <Menu.Item key={item.key}>
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>
          )}
        >
          <Space>
            <CiMenuKebab className="h5" />
          </Space>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="container-fluid ">
      <div className="row mt-5  d-flex justify-content-center">
        <div className="row">
          <h4 className="text-center mt-5">All Invoices</h4>
        </div>
        <div className="col-auto mt-5  ">
          {error ? (
            <p>{error}</p>
          ) : (
            <DataTable
              className="invoicetable"
              columns={columns}
              data={invoices}
              onRowClicked={handleRowClicked}
              pagination
              paginationPerPage={15}
              customStyles={{
                headRow: {
                  style: {
                    backgroundColor: "red",
                    color: "white",
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Invoices;
