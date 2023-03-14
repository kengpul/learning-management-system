import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import IQuiz from "../../models/Quiz";

import Header from "./Header";

import {
  Card,
  Col,
  FormGroup,
  Input,
  Label,
  Form,
  Row,
  Button,
  CardHeader,
  CardText,
} from "reactstrap";

interface SingleQuiz {
  question: string;
  choices: Array<{
    _id: string;
    answer: string;
    isCorrect: boolean;
  }>;
}

interface SingleChoice {
  answer: string;
  isCorrect: boolean;
  _id: string;
}

function Quiz() {
  const [quiz, setQuiz] = useState<null | IQuiz>(null);
  const [choice, setChoice] = useState<null | SingleChoice>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState<SingleChoice[]>([]);
  const [timer, setTimer] = useState("");
  const [score, setScore] = useState<null | number>(null);
  const { id } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    const getQuiz = async () => {
      const response = await fetch(
        process.env.REACT_APP_API_URI + "quiz/" + id,
        {
          headers: {
            Authorization: `Bearers ${user?.token}`,
          },
        }
      );

      const json = await response.json();

      if (response.ok) {
        setQuiz(json);
      }
    };

    if (user) {
      getQuiz();
    }
  }, [user, id]);

  const getTimer = () => {
    var time = 30;
    var saved_countdown = localStorage.getItem(
      `${user?.username}-quiz-${quiz?._id}-timer`
    );

    if (saved_countdown == null) {
      var new_countdown = new Date().getTime() + (time + 2) * 60 * 60 * 1000;
      time = new_countdown;
      localStorage.setItem(
        `${user?.username}-quiz-${quiz?._id}-timer`,
        new_countdown as unknown as string
      );
    } else {
      time = saved_countdown as unknown as number;
    }

    var x = setInterval(() => {
      var now = new Date().getTime();
      var distance = time - now;
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimer(`${minutes}:${seconds}`);

      if (minutes <= 0) {
        localStorage.removeItem("saved_countdown");
        handlePublish();
        clearInterval(x);
      }
    }, 1000);
  };

  const handleGetAnswers = (object: SingleQuiz, choiceIndex: number) => {
    const quizIndex = quiz!.quizzes.indexOf(object);
    const choice = quiz!.quizzes[quizIndex].choices[choiceIndex];
    setChoice(choice);
  };

  const handleNext = () => {
    if (quiz!.quizzes.length - 1 !== quizIndex) {
      setQuizIndex(quizIndex + 1);
    }

    selected.push(choice!);
    setSelected(selected);
    setChoice(null);
  };

  const handlePublish = async () => {
    let score = 0;
    for (let answer of selected) {
      if (answer.isCorrect) score++;
    }

    const response = await fetch(process.env.REACT_APP_API_URI + "quiz/" + id, {
      method: "POST",
      headers: {
        Authorization: `Bearers ${user?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ score }),
    });
    const json = await response.json();

    if (response.ok) {
      setScore(json.score);
    }
  };

  return (
    <Col className="mt-3">
      {score && score >= 0 && (
        <Col md="6" className="offset-md-3">
          <Card className="mt-5">
            <CardHeader className="d-flex justify-content-between">
              <CardText>{quiz?.title} </CardText>Score: {score}
            </CardHeader>
          </Card>
          <Link to="/quiz">
            <Button className="main-btn mt-3 w-100">Go back to quizzes</Button>
          </Link>
        </Col>
      )}
      {quiz && score === null && (
        <>
          {getTimer()}
          <Header
            questionLength={quizIndex + 1}
            quiz={quiz}
            timer={timer}
            handlePublish={handlePublish}
            isStudent
          />
          <Row className="d-flex justify-content-center">
            <Col md="7">
              {quiz && (
                <Card
                  className="p-3 mt-3"
                  key={quiz.quizzes[quizIndex].question}
                >
                  <Form>
                    <h5 className="mb-3">{quiz.quizzes[quizIndex].question}</h5>
                    <FormGroup>
                      <Input
                        type="radio"
                        data-cy="choice1"
                        id="choice1"
                        name="choice"
                        className="me-2 mt-2"
                        onChange={() =>
                          handleGetAnswers(quiz.quizzes[quizIndex], 0)
                        }
                      />
                      <Label for="choice1">
                        <span>{quiz.quizzes[quizIndex].choices[0].answer}</span>
                      </Label>
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="radio"
                        data-cy="choice2"
                        id="choice2"
                        name="choice"
                        className="me-2 mt-2"
                        onChange={() =>
                          handleGetAnswers(quiz.quizzes[quizIndex], 1)
                        }
                      />
                      <Label for="choice2">
                        <span>{quiz.quizzes[quizIndex].choices[1].answer}</span>
                      </Label>
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="radio"
                        data-cy="choice3u"
                        id="choice3"
                        name="choice"
                        className="me-2 mt-2"
                        onChange={() =>
                          handleGetAnswers(quiz.quizzes[quizIndex], 2)
                        }
                      />
                      <Label for="choice3">
                        <span>{quiz.quizzes[quizIndex].choices[2].answer}</span>
                      </Label>
                    </FormGroup>
                  </Form>
                  {selected.length !== quiz!.quizzes.length && (
                    <Button
                      data-cy="next-question"
                      className="main-btn"
                      onClick={handleNext}
                      disabled={!choice}
                    >
                      Next
                    </Button>
                  )}
                </Card>
              )}
            </Col>
          </Row>
        </>
      )}
    </Col>
  );
}

export default Quiz;
