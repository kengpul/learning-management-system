import React from "react";
import Room from "../../models/Room";

import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Button,
} from "reactstrap";
import { useFetch } from "../../hooks/useFetch";
import { Method } from "../../models/enums";

interface Props {
  room: Room;
  setRoom: React.Dispatch<React.SetStateAction<Room | null>>;
}

function Members({ room, setRoom }: Props) {
  const { modify, destroy } = useFetch();

  const handleReject = async (id: string) => {
    const student = await destroy(`/room/${room._id}/pending`, { id });
    if (!student.error) setRoom(student);
  };

  const handleAccept = async (id: string) => {
    const accepted = await modify(`/room/${room._id}/pending`, Method.POST, {
      id,
    });
    if (!accepted.error) setRoom(accepted);
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
