import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Room from "../../models/Room";

import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Button,
} from "reactstrap";

interface Props {
  room: Room;
  setRoom: React.Dispatch<React.SetStateAction<Room | null>>;
}

function Members({ room, setRoom }: Props) {
  const { user } = useAuthContext();

  const handleReject = async (id: string) => {
    const response = await fetch(
      process.env.REACT_APP_API_URI + "room/" + room._id + "/pending",
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
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

  const handleAccept = async (id: string) => {
    const response = await fetch(
      process.env.REACT_APP_API_URI + "room/" + room._id + "/pending",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
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

  return (
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

      <ListGroupItemHeading className="mt-4">Teachers</ListGroupItemHeading>

      {room &&
        room.teachers.map((teacher) => (
          <ListGroupItem key={`teacher-${teacher._id}`}>
            {teacher.username}
          </ListGroupItem>
        ))}

      <ListGroupItemHeading className="mt-4">Classmates</ListGroupItemHeading>
      {room &&
        room.students.map((student) => (
          <ListGroupItem key={`student-${student._id}`}>
            {student.username}
          </ListGroupItem>
        ))}
    </ListGroup>
  );
}

export default Members;
