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

  function favouritesPage() {
    history.push("/favourites");
  }

  return (
    <Navbar bg="primary" expand="lg">
      <Navbar.Brand style={{ fontWeight: "bold", fontStyle: "italic" }}>
        LK 21
      </Navbar.Brand>
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Link onClick={() => homePage()} style={{ fontWeight: "bold" }}>
            Movie
          </Nav.Link>
          <Nav.Link onClick={() => seriesPage()} style={{ fontWeight: "bold" }}>
            Series
          </Nav.Link>
          <NavDropdown
            title="More"
            id="basic-nav-dropdown"
            style={{ fontWeight: "bold" }}
          >
            <NavDropdown.Item
              onClick={() => addPage()}
              style={{ fontWeight: "bold" }}
            >
              Add Form
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => favouritesPage()}
              style={{ fontWeight: "bold" }}
            >
              Favourites
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarTop;
