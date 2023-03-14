import React, { FormEvent, useEffect, useState } from "react";
import ReactSelect, { MultiValue } from "react-select";
import { useAuthContext } from "../../hooks/useAuthContext";

import { Button, Col, Row } from "reactstrap";

interface Options {
  value: string;
  label: string;
}

function QuizForm() {
  const [roomOptions, setRoomOptions] = useState<Options[]>([]);
  const [quizOptions, setQuizOptions] = useState<Options[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<MultiValue<Options>>([]);
  const [selectedQuizzes, setSelectedQuizzes] = useState<MultiValue<Options>>(
    []
  );
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<null | string>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    if (selectedRooms.length === 0 || selectedQuizzes.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

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
        setRoomOptions(options);
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
        setQuizOptions(options);
      }
    };

    if (user) {
      getRooms();
      getQuizzes();
    }
  }, [user, selectedQuizzes, selectedRooms]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch(
      process.env.REACT_APP_API_URI + "quiz/publish",
      {
        method: "POST",
        headers: {
          Authorization: `Bearers ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedRooms, selectedQuizzes }),
      }
    );

    const json = await response.json();

    if (response.ok) {
      setSuccess("Successfully posted");
      setSelectedRooms([]);
      setSelectedQuizzes([]);
      setTimeout(() => setSuccess(null), 3500);
    } else {
      setError(json.error.message);
      setTimeout(() => setError(null), 3500);
    }
  };

  return (
    <Col className="mt-3">
      {success && <p className="text-success">{success}</p>}
      {error && <p className="text-danger">{error}</p>}
      <Row>
        <Col md="5" data-cy="select-room">
          <ReactSelect
            placeholder="Select room"
            options={roomOptions}
            isMulti
            value={selectedRooms}
            onChange={(selected) => setSelectedRooms(selected)}
          />
        </Col>
        <Col md="5" className="my-3 my-md-0" data-cy="select-quiz">
          <ReactSelect
            placeholder="Select quiz"
            options={quizOptions}
            isMulti
            value={selectedQuizzes}
            onChange={(selected) => setSelectedQuizzes(selected)}
          />
        </Col>
        <Col>
          <Button
            data-cy="post-quiz"
            disabled={disabled}
            className="main-btn w-100"
            onClick={handleSubmit}
          >
            Post
          </Button>
        </Col>
      </Row>
    </Col>
  );
}

export default QuizForm;
