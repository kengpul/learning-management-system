import { useState } from "react";
import { Link } from "react-router-dom";

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
  const [createModal, setCreateModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const createModalToggle = () => setCreateModal(!createModal);
  const joinModalToggle = () => setJoinModal(!joinModal);

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
            <Input placeholder="Name" className="mb-3" />
            <Input placeholder="Code" />
          </ModalBody>
          <ModalFooter>
            <Button className="main-btn" onClick={createModalToggle}>
              Create
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={joinModal} toggle={joinModalToggle}>
          <ModalHeader toggle={joinModalToggle}>Join</ModalHeader>
          <ModalBody>
            <Input placeholder="Code" />
          </ModalBody>
          <ModalFooter>
            <Button className="main-btn" onClick={joinModalToggle}>
              Join
            </Button>
          </ModalFooter>
        </Modal>
      </Row>
      <Row>
        <Col md="4" className="mt-3 room-card">
          <Card>
            <Link className="text-dark d-flex align-items-start">
              <CardBody>
                <CardTitle>THS1- Thesis Writing 1</CardTitle>
                <CardSubtitle className="text-muted">Jerico Vilog</CardSubtitle>
              </CardBody>
              <Button className="btn-danger mt-2 me-2 btn-sm">Leave</Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </Col>
  );
}

export default Rooms;
