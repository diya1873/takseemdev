import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Image from "next/image";
import './nav.css'

function HomeNavbar() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: '#E6E6E6' }}>
        <Navbar.Brand href="#" className='ms-5'>
          <Image
            src="/images/taqseem.png" // Replace with the path to your logo image
            height="30"
            alt="Logo"
            width={80}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" className='m-0 ' />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-5">
            <Nav.Link href="#link1" className='ms-3'>Home</Nav.Link>
            <Nav.Link href="#link2" className='ms-3'>Clients</Nav.Link>
            <Nav.Link href="#link3" className='ms-3'>About us</Nav.Link>
          </Nav>
        
  
  

 
         <a href="#" className="newButton float-end ms-md-auto me-3 btn getintouchbtn">Get In Tuch</a>

        </Navbar.Collapse>
    </Navbar>
  );
}

export default HomeNavbar;
