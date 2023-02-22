import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { usePostsContext } from "../../hooks/usePostsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

import CreatePostButton from "../../components/Card/CreatePostButton";
import PostCard from "../../components/Card/PostCard";

import {
  Col,
  Row,
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
  const [pending, setPending] = useState(false);
  const [tab, setTab] = useState("#post");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();

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

    if (user) {
      fetchPost();
    }
  }, [dispatch, user]);

  return (
    <Col className="mt-3 mb-5">
      <header className="header-room rounded">
        <div className="text-center text-md-start text-white px-3 py-2">
          <h1>THS1 - Thesis Writing 01</h1>
          <h2>Jerico Vilog</h2>

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
                  posts.map((post) => <PostCard key={post._id} post={post} />)}
              </div>
            </>
          )}

          {tab === "#members" && (
            <ListGroup flush className="mx-3">
              <ListGroupItemHeading>Teachers</ListGroupItemHeading>
              <ListGroupItem>Jerico Vilog</ListGroupItem>
              <ListGroupItem>ICCT</ListGroupItem>

              <ListGroupItemHeading className="mt-4">
                Classmates
              </ListGroupItemHeading>
              <ListGroupItem>Jhon Doe</ListGroupItem>
              <ListGroupItem>King Paul Pulgares</ListGroupItem>
              <ListGroupItem>Anna May</ListGroupItem>
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
