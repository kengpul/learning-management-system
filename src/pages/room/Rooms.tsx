import React, { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFetch } from "../../hooks/useFetch";
import { Method } from "../../models/enums";
import Room from "../../models/Room";
import { Account } from "../../models/User";
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
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchRooms, setSearchRooms] = useState<Room[]>([]);
  const [createModal, setCreateModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { get, modify, isPending, error: errorFetch } = useFetch();

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
      const room = await get("/room");
      if (!room.error) setRooms(room);
    };
    if (user) getRooms();
  }, [user]); // eslint-disable-line

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    const room = await modify("/room", Method.POST, { name, code });
    if (room) {
      navigate(`/room/${room._id}`);
    } else {
      setError("All fields are required");
      setTimeout(() => setError(null), 3500);
    }
  };

  const handleJoin = async (e: FormEvent) => {
    e.preventDefault();
    if (!code) return setError("Code is required");
    const room = await modify("/room/join", Method.POST, { code });
    console.log(room);
    if (room) {
      setCode("");
      joinModalToggle();
      setSuccess("Teacher will accept you to join in this room");
      setTimeout(() => {
        setSuccess(null);
      }, 3500);
    } else {
      setError(errorFetch ? errorFetch : "Invalid code");
    }
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
          <Row className=" d-flex align-items-center flex-column-reverse flex-md-row">
            <Col className="d-flex gap-3">
              <Input
                placeholder="Search room name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyUpCapture={handleSearch}
              />
            </Col>

            <Col className="d-block d-md-flex justify-content-end gap-2">
              {user?.type === Account.Teacher && (
                <Button
                  data-cy="create"
                  size="sm"
                  className="main-btn w-100"
                  onClick={createModalToggle}
                >
                  Create
                </Button>
              )}
              <Button
                data-cy="join"
                size="sm"
                className="main-btn my-3 my-md-0 px-3 w-100"
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
              data-cy="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Code"
              data-cy="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              data-cy="create-room"
              className="main-btn"
              onClick={handleCreate}
              disabled={isPending}
            >
              {isPending ? <Spinner /> : "Create"}
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={joinModal} toggle={joinModalToggle}>
          {error && <ToastCard message={error} color="danger" />}
          <ModalHeader toggle={joinModalToggle}>Join</ModalHeader>
          <ModalBody>
            <Input
              data-cy="input-code"
              placeholder="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              data-cy="join-room"
              className="main-btn"
              onClick={handleJoin}
              disabled={isPending}
            >
              {isPending ? <Spinner /> : "Join"}
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
                      {room.teachers && room.teachers[0].fullname}
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

export default Rooms;
