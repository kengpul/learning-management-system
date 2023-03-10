import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    console.log(score);
  };

  return (
    <Col className="mt-3">
      {quiz && (
        <>
          <Header
            questionLength={quizIndex + 1}
            quiz={quiz}
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
