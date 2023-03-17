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
import { useFetch } from "../../hooks/useFetch";
import { Method } from "../../models/enums";

function Header({ room }: { room: Room }) {
  const [attendance, setAttendance] = useState("");
  const [meeting, setMeeting] = useState("");
  const [leaveDropdown, setLeaveDropdown] = useState(false);
  const [linkModal, setLinkModal] = useState(false);

  const toggleLeave = () => setLeaveDropdown((prevState) => !prevState);
  const toggleLinks = () => setLinkModal((prevState) => !prevState);

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { modify, destroy, error } = useFetch();

  useEffect(() => {
    setAttendance(room.link.attendance);
    setMeeting(room.link.meeting);
  }, [room]);

  const handleLeave = async () => {
    const room = await destroy(`/room/${id}`, { id });
    if (!room.error) navigate("/room");
  };

  const handleLinks = async () => {
    const room = await modify(`/room/${id}`, Method.PUT, {
      attendance,
      meeting,
    });
    if (!room.error) {
      setAttendance(room.attendance);
      setMeeting(room.meeting);
      toggleLinks();
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
              data-cy="attendance"
              onClick={toggleLinks}
            >
              <i className="fa-solid fa-clipboard-user"></i>
              <p>Attendance</p>
            </div>

            <div
              className="text-center"
              role="button"
              data-cy="meeting"
              onClick={toggleLinks}
            >
              <i className="fa-solid fa-globe"></i>
              <p>Meeting</p>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center justify-content-md-start mt-5 fs-4">
            {attendance && (
              <a
                href={attendance}
                data-cy="attendance"
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
                data-cy="meeting"
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
        <p>Code: {room.code}</p>

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
              data-cy="input-attendance"
              placeholder="Attendance"
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
            />
            <Input
              data-cy="input-meeting"
              placeholder="Meeting"
              className="mt-3"
              value={meeting}
              onChange={(e) => setMeeting(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button className="main-btn" data-cy="update" onClick={handleLinks}>
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
        <DropdownToggle
          data-toggle="dropdown"
          data-cy="toggle-leave"
          tag="span"
          role="button"
        >
          <i className="fa-solid fa-ellipsis-vertical fa-2x"></i>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem data-cy="leave" onClick={handleLeave}>
            Leave
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </header>
  );
}

export default Header;
