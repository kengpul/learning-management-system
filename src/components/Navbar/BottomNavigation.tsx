import React from "react";
import { Link } from "react-router-dom";
import { Nav, Container } from "reactstrap";
import "./navigation.css";

function BottomNavigationBar() {
  return (
    <Nav className="fixed-bottom navbar-light d-block d-lg-none pe-0">
      <Container
        fluid="true"
        className="d-flex justify-content-around fs-4 py-2"
      >
        <Link to="/feed" className="navbar-brand">
          <i className="fas fa-house-user"></i>
        </Link>
        <Link to="/room" className="navbar-brand">
          <i className="fas fa-users"></i>
        </Link>
        <Link to="/group" className="navbar-brand">
          <i className="fas fa-users"></i>
        </Link>
        <Link to="/quiz" className="navbar-brand">
          <i className="fas fa-book-open me-2"></i>
        </Link>
        <Link to="/chat" className="navbar-brand">
          <i className="fas fa-comment me-2"></i>
        </Link>
      </Container>
    </Nav>
  );
}

export default BottomNavigationBar;
