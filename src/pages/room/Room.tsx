import React, { useState, useEffect } from "react";
import { NavLink, useParams, Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useAuthContext } from "../../hooks/useAuthContext";
import RoomModel from "../../models/Room";
import Header from "./Header";
import Post from "./Post";
import Members from "./Members";
import {
  Col,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import "./room.css";

function Room() {
  const [room, setRoom] = useState<RoomModel | null>(null);
  const [rooms, setRooms] = useState<RoomModel[]>([]);
  const [tab, setTab] = useState("#post");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const { user } = useAuthContext();
  const { id } = useParams();
  const { get } = useFetch();

  useEffect(() => {
    const fetchRoom = async () => {
      const response = await fetch(
        process.env.REACT_APP_API_URI + "/room/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearers ${user?.token}`,
          },
        }
      );

      const json = await response.json();

      if (response.ok) {
        setRoom(json);
      }
    };

    const fetchAllRooms = async () => {
      const rooms = await get("/room");
      if (!rooms.error) setRooms(rooms);
    };

    if (user) {
      fetchRoom();
      fetchAllRooms();
    }
  }, [user, id]); // eslint-disable-line

  if (room) {
    return (
      <Col className="mt-3 mb-5">
        <Header room={room} />

        <Row className="mt-3 d-flex flex-column-reverse flex-lg-row">
          <Col lg="8">
            {tab === "#post" && <Post />}

            {tab === "#members" && <Members room={room} setRoom={setRoom} />}
          </Col>

          <Col lg="4">
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle className="main-btn w-100" size="lg" caret>
                My Class
              </DropdownToggle>
              <DropdownMenu className="w-100">
                {rooms &&
                  rooms.map((room) => (
                    <DropdownItem key={room._id}>
                      <Link to={`/room/${room._id}`}>{room.name}</Link>
                    </DropdownItem>
                  ))}
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
  } else {
    return <Col></Col>;
  }
}

export default Room;
