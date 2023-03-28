import React from "react";
import { Link } from "react-router-dom";
import Room from "../../models/Room";
import { Card, CardBody, CardSubtitle, CardTitle, Col } from "reactstrap";

interface Props {
  rooms: Room[];
}

function Rooms({ rooms }: Props) {
  return (
    <Col md="7">
      {rooms.map((room) => (
        <Col className="mt-3 room-card" key={room._id}>
          <Card>
            <Link
              to={`/room/${room._id}`}
              className="text-dark d-flex align-items-start"
            >
              <CardBody>
                <CardTitle>{room.name}</CardTitle>
                <CardSubtitle className="text-muted">
                  {room.code}
                </CardSubtitle>
              </CardBody>
            </Link>
          </Card>
        </Col>
      ))}
    </Col>
  );
}

export default Rooms;
