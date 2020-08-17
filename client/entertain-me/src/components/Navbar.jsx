import React from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

function NavbarTop() {
  const history = useHistory();

  function homePage() {
    history.push("/");
  }

  function addPage() {
    history.push("/add-form");
  }

  function seriesPage() {
    history.push("/series");
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>React-Bootstrap</Navbar.Brand>
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Link onClick={() => homePage()}>Movie</Nav.Link>
          <Nav.Link onClick={() => seriesPage()}>Series</Nav.Link>
          <Nav.Link onClick={() => addPage()}>Add From</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item>Action</NavDropdown.Item>
            <NavDropdown.Item>Another action</NavDropdown.Item>
            <NavDropdown.Item>Something</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarTop;
