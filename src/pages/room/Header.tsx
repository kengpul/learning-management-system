import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

import ToastCard from "../../components/Card/ToastCard";
import Room from "../../models/Room";
import { Account } from "../../models/User";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";

function Header({ room }: { room: Room }) {
  const [attendance, setAttendance] = useState("");
  const [meeting, setMeeting] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [leaveDropdown, setLeaveDropdown] = useState(false);
  const [linkModal, setLinkModal] = useState(false);

  const toggleLeave = () => setLeaveDropdown((prevState) => !prevState);
  const toggleLinks = () => setLinkModal((prevState) => !prevState);

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    setAttendance(room.link.attendance);
    setMeeting(room.link.meeting);
  }, [room]);

  const handleLeave = async () => {
    const response = await fetch(process.env.REACT_APP_API_URI + "room/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer: ${user?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      navigate("/room");
    }
  };

  const handleLinks = async () => {
    const response = await fetch(process.env.REACT_APP_API_URI + "room/" + id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer: ${user?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ attendance, meeting }),
    });

    const json = await response.json();

    if (response.ok) {
      setError(null);
      setAttendance(json.attendance);
      setMeeting(json.meeting);
      toggleLinks();
    } else {
      setError(json.error.message);
    }
  };

  return (
    <header className="header-room rounded d-flex justify-content-between">
      <div className="text-center text-md-start text-white px-3 py-2">
        <h1>{room.name}</h1>
        <h2>{room.teachers && room.teachers[0].username}</h2>

        {user?.type === Account.Teacher ? (
          <div className="d-flex justify-content-center justify-content-md-start mt-5 fs-4">
            <div
              className="text-center text-white me-5"
              role="button"
              onClick={toggleLinks}
            >
              <i className="fa-solid fa-clipboard-user"></i>
              <p>Attendance</p>
            </div>

            <div className="text-center" role="button" onClick={toggleLinks}>
              <i className="fa-solid fa-globe"></i>
              <p>Meeting</p>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center justify-content-md-start mt-5 fs-4">
            {attendance && (
              <a
                href={attendance}
                className="text-center text-white me-5"
                role="button"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-solid fa-clipboard-user"></i>
                <p>Attendance</p>
              </a>
            )}
            {meeting && (
              <a
                href={meeting}
                className="text-center text-white"
                role="button"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-solid fa-globe"></i>
                <p>Meeting</p>
              </a>
            )}
          </div>
        )}

        <Modal isOpen={linkModal} toggle={toggleLinks}>
          <ModalHeader toggle={toggleLinks}>Links</ModalHeader>
          {error && <ToastCard message={error} color="danger" />}
          <ModalBody>
            {error && (
              <p className="text-muted">
                Example of valud url: https://url.com
              </p>
            )}
            <Input
              placeholder="Attendance"
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
            />
            <Input
              placeholder="Meeting"
              className="mt-3"
              value={meeting}
              onChange={(e) => setMeeting(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button className="main-btn" onClick={handleLinks}>
              Update
            </Button>
          </ModalFooter>
        </Modal>
      </div>

      <Dropdown
        isOpen={leaveDropdown}
        toggle={toggleLeave}
        className="text-white mt-3 me-3"
      >
        <DropdownToggle data-toggle="dropdown" tag="span" role="button">
          <i className="fa-solid fa-ellipsis-vertical fa-2x"></i>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={handleLeave}>Leave</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </header>
  );
}

export default Header;
