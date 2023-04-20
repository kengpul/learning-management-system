import React, { FormEvent, useEffect, useRef, useState } from "react";
import * as io from "socket.io-client";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFetch } from "../../hooks/useFetch";
import Room from "../../models/Room";
import { Messages } from "../../models/Chat";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardText,
  Col,
  Form,
  Input,
  List,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";

function Chat() {
  const [room, setRoom] = useState<Room | null>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Messages[]>([]);
  const socket = io.connect(process.env.REACT_APP_API_URI as string, {
    autoConnect: false,
  });
  const { id } = useParams();
  const { user } = useAuthContext();
  const { get } = useFetch();
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getMessages = async () => {
      const chatRoom = await get(`/room/${id}/chat`);
      if (chatRoom) {
        setRoom(chatRoom.room);
        setMessages(chatRoom.chat.messages);
      }

      socket.connect();
      socket.emit("join_room", chatRoom.chat._id);
    };

    if (user) getMessages();

    return () => {
      socket.disconnect();
    };
  }, [user, id]); // eslint-disable-line

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
    socket.on("receive_message", (data) => {
      setMessages(data);
    });
  }, [socket]);

  const handleDates = (content: Date) => {
    const created = new Date(content);
    const days = new Date().getUTCDate() - created.getUTCDate();
    const hours = new Date().getHours() - new Date(content).getHours();
    const minutes = Math.round(
      (new Date().getTime() - new Date(content).getTime()) / 60000
    );

    if (days > 0) {
      return `${days}d`;
    } else if (hours > 0 && days < 1) {
      return `${hours}h`;
    } else if (minutes > 0 && hours < 1 && days < 1) {
      return `${minutes}m`;
    } else {
      return "now";
    }
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    socket.connect();
    socket.emit("send_message", {
      room: room?.chat,
      text: message,
      author: user?.username,
    });
    setMessage("");
  };

  return (
    <Col className="mt-3">
      <Row className="mx-2 shadow">
        <Col
          md="8"
          className="border border-3 p-0 position-relative rounded-start"
          style={{ height: "28em" }}
        >
          <div className="border-bottom border-3 shadow-sm">
            <h3 className="p-2 text-center text-md-start">
              {room && room.name}
            </h3>
          </div>

          <div className="px-2 overflow-auto" style={{ height: "20em" }}>
            {messages.length === 0 && (
              <p className="text-muted text-center">
                Start of the conversation
              </p>
            )}
            {messages.length > 0 &&
              messages.map((message) => (
                <React.Fragment key={message._id}>
                  <Card className="shadow w-50 mt-3 ms-auto">
                    <CardBody>
                      <CardText>{message.text}</CardText>
                    </CardBody>
                    <CardFooter className="p-1 ps-3">
                      {message.author} - {handleDates(message.time)}
                    </CardFooter>
                  </Card>
                </React.Fragment>
              ))}
            <div ref={chatRef}></div>
          </div>

          <Form
            onSubmit={handleSendMessage}
            className="position-absolute bottom-0 w-100 mb-1 d-flex gap-2 px-1"
          >
            <Input
              placeholder="Type your text here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button disabled={message === ""} className="main-btn">
              Send
            </Button>
          </Form>
        </Col>

        <Col
          md="4"
          className="border-top border-end border-bottom border-3 p-0 d-none d-md-block rounded-end"
        >
          <div className="border-bottom border-3 shadow-sm mb-3">
            <h3 className="p-2">Members</h3>
          </div>
          <List className="px-3">
            <h5 className="border-bottom ps-3 pb-1">Teachers</h5>
            <ListGroup flush>
              {room?.teachers &&
                room.teachers.map((teacher) => (
                  <ListGroupItem key={teacher._id}>
                    <Link
                      to={`/profile/${teacher._id}/message`}
                      className="link-secondary"
                    >
                      {teacher.fullname}
                    </Link>
                  </ListGroupItem>
                ))}
            </ListGroup>
          </List>

          <List className="px-3">
            <h5 className="border-bottom ps-3 pb-1">Students</h5>
            <ListGroup flush>
              {room?.students &&
                room.students.map((student) => (
                  <ListGroupItem key={student._id}>
                    <Link
                      to={`/profile/${student._id}/message`}
                      className="link-secondary"
                    >
                      {student.fullname}
                    </Link>
                  </ListGroupItem>
                ))}
            </ListGroup>
          </List>
        </Col>
      </Row>
    </Col>
  );
}

export default Chat;
