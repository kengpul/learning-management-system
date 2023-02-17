import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

import {
  Container,
  Navbar,
  NavbarBrand,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import logo from "../../assets/logo.png";
import avatar from "../../assets/default-avatar.png";
import "./navigation.css";

export const NavigationBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const { user, dispatch } = useAuthContext();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <Container fluid className="post-navbar shadow-sm">
      <Container>
        <Navbar>
          <NavbarBrand href="/post/" className="d-flex align-items-center">
            <div>
              <img src={logo} width={50} alt="logo" />
            </div>
            <div className="d-none d-sm-flex flex-column text-start border-start ms-1 ps-2">
              <span className="fw-bold fs-5">ICCT Colleges</span>
              <span className="fs-6">Learning Management System</span>
            </div>
          </NavbarBrand>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle
              caret
              color="white"
              className="d-flex align-items-center"
            >
              <div>
                <img
                  src={avatar}
                  width="45"
                  className="rounded-circle"
                  alt=""
                />
              </div>
              <div className="mx-2 d-none d-sm-block">
                <div className="fw-bold">{user.username}</div>
                <div className="text-muted">{user.type}</div>
              </div>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Profile</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Navbar>
      </Container>
    </Container>
  );
};
