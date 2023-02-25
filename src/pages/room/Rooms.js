import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

import ToastCard from "../../components/Card/ToastCard";

import {
  Col,
  Row,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "reactstrap";
import "./room.css";

function Rooms() {
  const [rooms, setRooms] = useState(null);
  const [searchRooms, setSearchRooms] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [search, setSearch] = useState("");
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const createModalToggle = () => {
    setCreateModal(!createModal);
    setError(null);
  };
  const joinModalToggle = () => {
    setJoinModal(!joinModal);
    setError(null);
  };

  useEffect(() => {
    const getRooms = async () => {
      setPending(true);
      const response = await fetch(process.env.REACT_APP_API_URI + "room", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setRooms(json);
      }
      setPending(false);
    };

    if (user) getRooms();
  }, [user]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setPending(true);
    const response = await fetch(process.env.REACT_APP_API_URI + "room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ name, code }),
    });

    const json = await response.json();

    if (response.ok) {
      navigate(`/room/${json._id}`);
    } else {
      setError(json.error.message);
    }
    setPending(false);
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    setPending(true);
    const response = await fetch(process.env.REACT_APP_API_URI + "room/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ code }),
    });

    const json = await response.json();

    if (response.ok) {
      setCode("");
      joinModalToggle();
      setSuccess("Teacher will accept you to join in this room");
      setTimeout(() => {
        setSuccess(null);
      }, "3500");
    } else {
      setError(json.error.message);
    }
    setPending(false);
  };

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
    setSearchRooms(searchResults);
  };

  return (
    <Col>
      {success && <ToastCard message={success} color="success" />}
      <Row className="mt-3">
        <Col>
          <Row className="d-flex align-items-center">
            <Col className="d-flex gap-3">
              <Input
                placeholder="Search class"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyUpCapture={handleSearch}
              />
            </Col>

            <Col className="d-flex justify-content-end gap-2">
              <Button
                size="sm"
                className="main-btn"
                onClick={createModalToggle}
              >
                Create
              </Button>
              <Button
                size="sm"
                className="main-btn px-3"
                onClick={joinModalToggle}
              >
                Join
              </Button>
            </Col>
          </Row>
        </Col>

        <Modal isOpen={createModal} toggle={createModalToggle}>
          {error && <ToastCard message={error} color="danger" />}
          <ModalHeader toggle={createModalToggle}>Create</ModalHeader>
          <ModalBody>
            <Input
              placeholder="Name"
              className="mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              className="main-btn"
              onClick={handleCreate}
              disabled={pending}
            >
              {pending ? <Spinner /> : "Create"}
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={joinModal} toggle={joinModalToggle}>
          {error && <ToastCard message={error} color="danger" />}
          <ModalHeader toggle={joinModalToggle}>Join</ModalHeader>
          <ModalBody>
            <Input
              placeholder="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              className="main-btn"
              onClick={handleJoin}
              disabled={pending}
            >
              {pending ? <Spinner /> : "Join"}
            </Button>
          </ModalFooter>
        </Modal>
      </Row>
      <Row>
        {error && <h2 className="text-muted text-center mt-3">{error}</h2>}
        {searchRooms &&
          searchRooms.map((room) => (
            <Col md="4" className="mt-3 room-card" key={room._id}>
              <Card>
                <Link
                  to={`/room/${room._id}`}
                  className="text-dark d-flex align-items-start"
                >
                  <CardBody>
                    <CardTitle>{room.name}</CardTitle>
                    <CardSubtitle className="text-muted">
                      {room.teachers[0].username}
                    </CardSubtitle>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}

        {rooms &&
          searchRooms.length === 0 &&
          !error &&
          rooms.map((room) => (
            <Col md="4" className="mt-3 room-card" key={room._id}>
              <Card>
                <Link
                  to={`/room/${room._id}`}
                  className="text-dark d-flex align-items-start"
                >
                  <CardBody>
                    <CardTitle>{room.name}</CardTitle>
                    <CardSubtitle className="text-muted">
                      {room.teachers[0].username}
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

export default Rooms;
