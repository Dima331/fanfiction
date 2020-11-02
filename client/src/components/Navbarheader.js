import React, {useContext} from 'react'
import { NavLink, Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

export const Navbarheader = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/list">Features</Nav.Link>
          <Nav.Link href="/po3sr">Pricing</Nav.Link>
        </Nav>
      </Navbar>
    </>
  )
}