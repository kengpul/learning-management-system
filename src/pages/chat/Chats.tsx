import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFetch } from "../../hooks/useFetch";
import Room from "../../models/Room";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Input,
  Row,
} from "reactstrap";

function Chats() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchChats, setSearchChats] = useState<Room[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { get } = useFetch();
  const { user } = useAuthContext();

  useEffect(() => {
    const getRooms = async () => {
      const room = await get("/room");
      setRooms(room);
    };

    if (user) getRooms();
  }, [user]); //eslint-disable-line

  const handleSearch = async () => {
    const searchResults = [];
    for (let room of rooms) {
      if (room.name.toLowerCase().includes(search.trim().toLowerCase())) {
        searchResults.push(room);
      } else {
        setError("No result");
      }
    }
    if (searchResults.length) setError(null);
    setSearchChats(searchResults);
  };

  return (
    <Col className="mt-3">
      <Row className="d-flex justify-content-between flex-column-reverse flex-md-row">
        <Col md="6">
          <Input
            placeholder="Search group chat"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUpCapture={handleSearch}
          />
        </Col>
      </Row>

      <Row>
        {searchChats.length > 0 &&
          searchChats.map((chat) => (
            <Col md="4" className="mt-3 room-card" key={chat._id}>
              <Card>
                <Link
                  to={`/chats/${chat._id}`}
                  className="text-dark d-flex align-items-start"
                >
                  <CardBody>
                    <CardTitle>{chat.name}</CardTitle>
                    <CardSubtitle className="text-muted">
                      {chat.teachers[0].fullname}
                    </CardSubtitle>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
      </Row>

      {error && <h2 className="text-muted text-center mt-3">{error}</h2>}

      <Row>
        {rooms.length > 0 &&
          searchChats.length === 0 &&
          !error &&
          rooms.map((room) => (
            <Col md="4" className="mt-3 room-card" key={room._id}>
              <Card>
                <Link
                  to={`/chats/${room._id}`}
                  className="text-dark d-flex align-items-start"
                >
                  <CardBody data-cy="quiz-card">
                    <CardTitle>{room.name}</CardTitle>
                    <CardSubtitle className="text-muted">
                      {room.teachers[0].fullname}
                    </CardSubtitle>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
      </Row>
    </Col>
  );
}

export default Chats;
