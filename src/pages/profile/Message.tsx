import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardText,
  Col,
  Form,
  Input,
} from "reactstrap";
import * as io from "socket.io-client";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFetch } from "../../hooks/useFetch";
import { Messages } from "../../models/Room";
import User from "../../models/User";

function Message() {
  const socket = io.connect(process.env.REACT_APP_API_URI as string);
  const [roomID, setRoomID] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Messages[]>([]);
  const [receiver, setReciever] = useState<User | null>(null);
  const { user } = useAuthContext();
  const { id } = useParams();
  const { get } = useFetch();
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getMessages = async () => {
      if (roomID) {
        const room = await get(`/connect/${roomID}/messages`);
        if (room) setMessages(room.messages);
      }
    };
    const getReciever = async () => {
      const user = await get(`/connect/${id}`);
      if (user) setReciever(user);
    };

    socket.emit("join-message-room", { id, user: user?._id });
    socket.on("receive-message-id", (data) => setRoomID(data));

    if (user) {
      getMessages();
      getReciever();
    }
  }, [user, roomID, id]); // eslint-disable-line

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
    socket.on(`receive-message-${roomID}`, (data) => {
      setMessages([...messages, data]);
    });
  }, [socket]); // eslint-disable-line

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    socket.emit("send-direct-message", {
      room: roomID,
      text: message,
      author: user?.username,
    });
    setMessage("");
  };

  return (
    <Col
      className="border border-3 p-0 position-relative mt-3 mx-3 rounded"
      style={{ height: "28em" }}
    >
      <div className="border-bottom border-3 shadow-sm">
        <h3 className="p-2 text-center text-md-start">{receiver?.fullname}</h3>
      </div>

      <div className="px-2 overflow-auto" style={{ height: "20em" }}>
        {messages.length === 0 && (
          <p className="text-muted text-center">Start of the conversation</p>
        )}
        {messages.length > 0 &&
          messages.map((message: Messages) => (
            <React.Fragment key={message._id}>
              <Card className="shadow w-50 mt-3 ms-auto">
                <CardBody>
                  <CardText>{message.text}</CardText>
                </CardBody>
                <CardFooter className="p-1 ps-3">
                  {message.author} - {"time"}
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
        <Button className="main-btn">Send</Button>
      </Form>
    </Col>
  );
}

export default Message;
