import React from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const NavBar: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="mb-4 shadow-sm"
      style={{
        background: "rgba(24, 28, 32, 0.95)",
        borderRadius: "1.2rem",
        backdropFilter: "blur(6px)",
        minHeight: "72px",
      }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            fontWeight: 700,
            letterSpacing: "2px",
            fontSize: "2rem",
            color: "#fff",
            textShadow: "0 2px 12px rgba(0,0,0,0.25)",
          }}
        >
          MyStore
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto" style={{ alignItems: "center" }}>
            <Nav.Link
              as={Link}
              to="/"
              style={{
                fontSize: "1.07rem",
                marginRight: "1.6rem",
                fontWeight: 500,
                color: "#f4f4f4",
                letterSpacing: "1px",
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/cart"
              style={{
                fontSize: "1.07rem",
                position: "relative",
                color: "#f4f4f4",
                fontWeight: 500,
                letterSpacing: "1px",
              }}
            >
              Cart{" "}
              {totalCount > 0 && (
                <Badge
                  pill
                  bg="danger"
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-22px",
                    fontSize: "0.78rem",
                    padding: "4px 9px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                >
                  {totalCount}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;