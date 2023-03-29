import React from "react";
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
import "./navigation.css";

function NavigationBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const { user, dispatch } = useAuthContext();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch!({ type: "LOGOUT", payload: null });
  };

  return (
    <Container fluid className="post-navbar shadow-sm">
      <Container>
        <Navbar>
          <NavbarBrand href="/feed/" className="d-flex align-items-center">
            <div>
              <img
                src="https://res.cloudinary.com/dsjrdrewd/image/upload/c_scale,w_50/v1676885961/learning-management-system/assets/logo_pwtamk.png"
                alt="logo"
              />
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
                  src="https://res.cloudinary.com/dsjrdrewd/image/upload/v1676885960/learning-management-system/assets/default-avatar_hk6j0v.png"
                  width="45"
                  className="rounded-circle"
                  alt=""
                />
              </div>
              <div className="mx-2 d-none d-sm-block">
                <div className="fw-bold">{user?.fullname}</div>
                <div className="text-muted">{user?.type}</div>
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
}

export default NavigationBar;
