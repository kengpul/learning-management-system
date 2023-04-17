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
  Button,
} from "reactstrap";
import User from "../../models/User";

interface Chat {
  readonly _id: string;
  members: [User, User];
  messages: {
    readonly _id: string;
    text: string;
    author: string;
    time: Date;
  }[];
}

function Chats() {
  const [tab, setTab] = useState<"Personal" | "Group">("Group");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchChats, setSearchChats] = useState<Room[]>([]);
  const [searchPeople, setSearchPeople] = useState<Chat[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { get } = useFetch();
  const { user } = useAuthContext();

  useEffect(() => {
    const getRooms = async () => {
      const room = await get("/room");
      setRooms(room);
    };

    const getAllRooms = async () => {
      const allChats = await get("/connect/chats");
      if (allChats) setChats(allChats);
    };

    if (user) {
      getRooms();
      getAllRooms();
    }
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

  const handleSearchPersonal = async () => {
    const searchResults = [];
    for (let chat of chats) {
      for (let member of chat.members) {
        if (
          member.fullname.toLowerCase().includes(search.trim().toLowerCase()) &&
          member._id !== user?._id
        ) {
          searchResults.push(chat);
        } else {
          setError("No result");
          setSearchPeople([]);
        }
      }
    }
    if (searchResults.length) setError(null);
    setSearchPeople(searchResults);
  };

  const handleTab = () => {
    if (tab === "Group") setTab("Personal");
    else setTab("Group");
  };

  return (
    <Col className="mt-3">
      <Row className="d-flex justify-content-between flex-column-reverse flex-md-row">
        <Col md="6">
          <Input
            placeholder="Search group chat"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUpCapture={
              tab === "Personal" ? handleSearchPersonal : handleSearch
            }
          />
        </Col>
        <Col md="6" className="text-end">
          <Button className="main-btn" onClick={handleTab}>
            {`${tab} chats`}
          </Button>
        </Col>
      </Row>

      {tab === "Group" && (
        <>
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
        </>
      )}

      {tab === "Personal" && (
        <>
          <Row>
            {searchPeople.length > 0 &&
              searchPeople.map((chat) => (
                <Col md="4" className="mt-3 room-card" key={chat._id}>
                  <Card>
                    <Link
                      to={`/profile/${
                        chat.members[0]._id === user?._id
                          ? chat.members[1]._id
                          : chat.members[0]._id
                      }/message`}
                      className="text-dark d-flex align-items-start"
                    >
                      <CardBody data-cy="quiz-card">
                        <CardTitle>
                          {chat.members[0]._id === user?._id
                            ? chat.members[1].fullname
                            : chat.members[0].fullname}
                        </CardTitle>
                        <CardSubtitle className="text-muted">
                          {chat.messages[chat.messages.length - 1].text}
                        </CardSubtitle>
                      </CardBody>
                    </Link>
                  </Card>
                </Col>
              ))}
          </Row>

          {error && <h2 className="text-muted text-center mt-3">{error}</h2>}

          <Row>
            {chats &&
              chats.length > 0 &&
              searchPeople.length === 0 &&
              !error &&
              chats.map((chat) => (
                <Col md="4" className="mt-3 room-card" key={chat._id}>
                  <Card>
                    <Link
                      to={`/profile/${
                        chat.members[0]._id === user?._id
                          ? chat.members[1]._id
                          : chat.members[0]._id
                      }/message`}
                      className="text-dark d-flex align-items-start"
                    >
                      <CardBody data-cy="quiz-card">
                        <CardTitle>
                          {chat.members[0]._id === user?._id
                            ? chat.members[1].fullname
                            : chat.members[0].fullname}
                        </CardTitle>
                        <CardSubtitle className="text-muted">
                          {chat.messages[chat.messages.length - 1].text}
                        </CardSubtitle>
                      </CardBody>
                    </Link>
                  </Card>
                </Col>
              ))}
          </Row>
        </>
      )}
    </Col>
  );
}

export default Chats;
