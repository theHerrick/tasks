// src/Navbar.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CustomNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">Todo</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/new">New</Nav.Link>
        <Nav.Link as={Link} to="/update">Update</Nav.Link>
        <Nav.Link as={Link} to="/delete">Delete</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default CustomNavbar;
