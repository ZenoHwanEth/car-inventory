import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const NavigationBar = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="/">Car Inventory</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Add New Car</Nav.Link>
          <Nav.Link href="/searchCarPlate">Search Car Plate</Nav.Link>
          <Nav.Link href="/saleReport">View Sales Record</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavigationBar;
