import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { useAuthContext } from "../../hooks/useAuthContext";

import { Button, Col, Row } from "reactstrap";

interface Options {
  value: string;
  label: string;
}

function QuizForm() {
  const [rooms, setRooms] = useState<Options[]>([]);
  const [quizzes, setQuizzes] = useState<Options[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const getRooms = async () => {
      const response = await fetch(process.env.REACT_APP_API_URI + "room", {
        headers: {
          Authorization: `Bearers ${user?.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        const options = [];
        for (let room of json) {
          const option = {
            value: room._id,
            label: room.name,
          };
          options.push(option);
        }
        setRooms(options);
      }
    };

    const getQuizzes = async () => {
      const response = await fetch(process.env.REACT_APP_API_URI + "quiz", {
        headers: {
          Authorization: `Bearers ${user?.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        const options = [];
        for (let quiz of json) {
          const option = {
            value: quiz._id,
            label: quiz.title,
          };
          options.push(option);
        }
        setQuizzes(options);
      }
    };

    if (user) {
      getRooms();
      getQuizzes();
    }
  }, [user]);

  return (
    <Col className="mt-3">
      <Row>
        <Col md="5">
          <ReactSelect placeholder="Select room" options={rooms} isMulti />
        </Col>
        <Col md="5" className="my-3 my-md-0">
          <ReactSelect placeholder="Select quiz" options={quizzes} isMulti />
        </Col>
        <Col>
          <Button className="main-btn w-100">Post</Button>
        </Col>
      </Row>
    </Col>
  );
}

export default QuizForm;
