import { useState } from "react";

import "./navbar.css";
import logo from "../../assets/logo.png";

import {
  Container,
  List,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse,
  Button,
} from "reactstrap";

export const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Container fluid="true" className="contact-details d-none d-sm-block">
        <Container
          fluid="true"
          className="container-md py-1 d-flex justify-content-center justify-content-md-end"
        >
          <List type="unstyled" className="list-group list-group-horizontal">
            <li className="list-group-item border-end">
              <i className="fas fa-phone-alt me-1"></i>
              +63.123.456.7890
            </li>
            <li className="list-group-item border-end">
              <i className="fas fa-envelope me-1"></i>
              info.icct.edu.ph
            </li>
            <li className="list-group-item">
              Follow us on
              <i className="fab fa-facebook-f ms-1"></i>
              <i className="fab fa-twitter mx-1"></i>
              <i className="fab fa-facebook-messenger"></i>
            </li>
          </List>
        </Container>
      </Container>
      <Navbar dark className="main-navbar" expand="md">
        <NavbarBrand href="/" className="d-flex align-items-center">
          <div>
            <img src={logo} width={70} alt="logo" />
          </div>
          <div className="d-flex flex-column text-start border-start ms-1 ps-2">
            <span className="fw-bold">ICCT Colleges</span>
            <span>Believe in Yourself</span>
          </div>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-md-5" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
          </Nav>

          <Nav className="ms-auto pe-md-5" navbar>
            <NavItem>
              <Button className="authenticate-button" href="/connect">
                Login/Register
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};
