import { Link } from "react-router-dom";

import { Nav, Container } from "reactstrap";
import './navigation.css';

export const BottomNavigationBar = () => {
  return (
    <Nav className="fixed-bottom navbar-light d-block d-lg-none">
      <Container fluid="true" className="d-flex justify-content-around fs-4 py-2">
        <Link to="/post" className="navbar-brand">
          <i className="fas fa-house-user"></i>
        </Link>
        <Link to="/class" className="navbar-brand">
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
};
