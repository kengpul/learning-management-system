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
} from "reactstrap";
import "./room.css";

function Rooms() {
  const [rooms, setRooms] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const createModalToggle = () => setCreateModal(!createModal);
  const joinModalToggle = () => setJoinModal(!joinModal);

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
      setError(json.error);
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

    console.log(json);

    if (response.ok) {
      setCode("");
      joinModalToggle();
    }
    setPending(false);
  };

  return (
    <Col>
      <Row className="mt-3">
        <Col md="6" className="d-flex gap-3">
         
          <Input placeholder="Search class" />
          <Button size="sm" className="main-btn" onClick={createModalToggle}>
            Create
          </Button>
          <Button size="sm" className="main-btn px-3" onClick={joinModalToggle}>
            Join
          </Button>
        </Col>

        <Modal isOpen={createModal} toggle={createModalToggle}>
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
            <Button className="main-btn" onClick={handleCreate}>
              Create
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={joinModal} toggle={joinModalToggle}>
          <ModalHeader toggle={joinModalToggle}>Join</ModalHeader>
          <ModalBody>
            <Input
              placeholder="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button className="main-btn" onClick={handleJoin}>
              Join
            </Button>
          </ModalFooter>
        </Modal>
      </Row>
      <Row>
        {rooms &&
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
                  <Button className="btn-danger mt-2 me-2 btn-sm">Leave</Button>
                </Link>
              </Card>
            </Col>
          ))}
      </Row>
    </Col>
  );
}

export default Rooms;
