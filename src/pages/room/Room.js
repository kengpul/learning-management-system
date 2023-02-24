import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

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
} from "reactstrap";
import "./room.css";

function Room() {
  const [room, setRoom] = useState(null);
  const [pending, setPending] = useState(false);
  const [tab, setTab] = useState("#post");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      setPending(true);
      const response = await fetch(process.env.REACT_APP_API_URI + "post", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearers ${user.token}`,
        },
      });
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
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearers ${user.token}`,
          },
        }
      );

      const json = await response.json();

      if (response.ok) {
        setRoom(json);
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

    console.log(json);

    if (response.ok) {
      setRoom(json);
    }
  };

  if (room)
    return (
      <Col className="mt-3 mb-5">
        <header className="header-room rounded">
          <div className="text-center text-md-start text-white px-3 py-2">
            <h1>{room.name}</h1>
            <h2>{room.teachers[0].username}</h2>

            <div className="d-flex justify-content-center justify-content-md-start mt-5 fs-4">
              <div className="text-center me-5">
                <i className="fa-solid fa-clipboard-user"></i>
                <p>Attendance</p>
              </div>

              <div className="text-center">
                <i className="fa-solid fa-globe"></i>
                <p>Meeting</p>
              </div>
            </div>
          </div>
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
