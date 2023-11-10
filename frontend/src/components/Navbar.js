// src/DarkNavbar.js
import React from 'react';
import { Navbar } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand className="mx-auto" href="#home">
        Tasks
      </Navbar.Brand>
    </Navbar>
  );
};

export default NavBar;
