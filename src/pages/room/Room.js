import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { usePostsContext } from "../../hooks/usePostsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

import CreatePostButton from "../../components/Card/CreatePostButton";
import PostCard from "../../components/Card/PostCard";

import {
  Col,
  Row,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import "./room.css";
import ToastCard from "../../components/Card/ToastCard";

function Room() {
  const [room, setRoom] = useState(null);
  const [attendance, setAttendance] = useState("");
  const [meeting, setMeeting] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("#post");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [leaveDropdown, setLeaveDropdown] = useState(false);
  const [linkModal, setLinkModal] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const toggleLeave = () => setLeaveDropdown((prevState) => !prevState);
  const toggleLinks = () => setLinkModal((prevState) => !prevState);
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setPending(true);
      const response = await fetch(
        process.env.REACT_APP_API_URI + "room/" + id,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearers ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "GET_POSTS", payload: json });
      }
      setPending(false);
    };

    const fetchRoom = async () => {
      const response = await fetch(
        process.env.REACT_APP_API_URI + "room/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearers ${user.token}`,
          },
        }
      );

      const json = await response.json();

      if (response.ok) {
        setRoom(json);
        setAttendance(json.link.attendance);
        setMeeting(json.link.meeting);
      }
    };

    if (user) {
      fetchPost();
      fetchRoom();
    }
  }, [dispatch, user, id]);

  const handleReject = async (id) => {
    const response = await fetch(
      process.env.REACT_APP_API_URI + "room/" + room._id + "/pending",
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    const json = await response.json();

    if (response.ok) {
      setRoom(json);
    }
  };

  const handleAccept = async (id) => {
    const response = await fetch(
      process.env.REACT_APP_API_URI + "room/" + room._id + "/pending",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    const json = await response.json();

    if (response.ok) {
      setRoom(json);
    }
  };

  const handleLeave = async () => {
    const response = await fetch(process.env.REACT_APP_API_URI + "room/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer: ${user.token}`,
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
        Authorization: `Bearer: ${user.token}`,
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
      setError(json.error);
    }
  };

  if (room)
    return (
      <Col className="mt-3 mb-5">
        <header className="header-room rounded d-flex justify-content-between">
          <div className="text-center text-md-start text-white px-3 py-2">
            <h1>{room.name}</h1>
            <h2>{room.teachers[0].username}</h2>

            {user.type === "Teacher" ? (
              <div className="d-flex justify-content-center justify-content-md-start mt-5 fs-4">
                <div
                  className="text-center text-white me-5"
                  role="button"
                  onClick={toggleLinks}
                >
                  <i className="fa-solid fa-clipboard-user"></i>
                  <p>Attendance</p>
                </div>

                <div
                  className="text-center"
                  role="button"
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
                    className="text-center text-white me-5"
                    role="button"
                    target="_blank"
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
                  >
                    <i className="fa-solid fa-globe"></i>
                    <p>Meeting</p>
                  </a>
                )}
              </div>
            )}

            <Modal isOpen={linkModal} toggle={toggleLinks}>
              <ModalHeader toggle={toggleLinks}>Links</ModalHeader>
              {error && <ToastCard message={error.message} color="danger" />}
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

        <Row className="mt-3 d-flex flex-column-reverse flex-lg-row">
          <Col lg="8">
            {tab === "#post" && (
              <>
                <CreatePostButton />
                <div className="post">
                  {posts &&
                    posts.length > 0 &&
                    posts.map((post) => (
                      <PostCard key={post._id} post={post} />
                    ))}
                </div>
              </>
            )}

            {tab === "#members" && (
              <ListGroup flush className="mx-3">
                <ListGroupItemHeading>Pending</ListGroupItemHeading>
                {room &&
                  room.pending.map((student) => (
                    <ListGroupItem
                      key={`pending-${student._id}`}
                      className="d-flex justify-content-between"
                    >
                      {student.username}
                      <div>
                        <Button
                          className="main-btn me-2"
                          onClick={() => handleAccept(student._id)}
                        >
                          <i className="fa-solid fa-circle-check fa-lg"></i>
                        </Button>
                        <Button
                          className="btn-danger"
                          onClick={() => handleReject(student._id)}
                        >
                          <i className="fa-solid fa-circle-xmark fa-lg"></i>
                        </Button>
                      </div>
                    </ListGroupItem>
                  ))}

                <ListGroupItemHeading className="mt-4">
                  Teachers
                </ListGroupItemHeading>

                {room &&
                  room.teachers.map((teacher) => (
                    <ListGroupItem key={`teacher-${teacher._id}`}>
                      {teacher.username}
                    </ListGroupItem>
                  ))}

                <ListGroupItemHeading className="mt-4">
                  Classmates
                </ListGroupItemHeading>
                {room &&
                  room.students.map((student) => (
                    <ListGroupItem key={`student-${student._id}`}>
                      {student.username}
                    </ListGroupItem>
                  ))}
              </ListGroup>
            )}
          </Col>

          <Col lg="4">
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle className="main-btn w-100" size="lg" caret>
                My Class
              </DropdownToggle>
              <DropdownMenu className="w-100">
                <DropdownItem>Some Action</DropdownItem>
                <DropdownItem>Foo Action</DropdownItem>
                <DropdownItem>Bar Action</DropdownItem>
                <DropdownItem>Quo Action</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <ListGroup className="my-3 d-flex flex-row flex-lg-column">
              <NavLink to="#post">
                <ListGroupItem
                  className={
                    tab === "#post" ? "text-white main-btn w-100" : "w-100"
                  }
                  tag="button"
                  onClick={() => setTab("#post")}
                >
                  Post
                </ListGroupItem>
              </NavLink>
              <NavLink to="#members">
                <ListGroupItem
                  tag="button"
                  className={
                    tab === "#members" ? "text-white main-btn w-100" : "w-100"
                  }
                  onClick={() => setTab("#members")}
                >
                  Members
                </ListGroupItem>
              </NavLink>
              <ListGroupItem tag="button">Files</ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </Col>
    );
}

export default Room;
