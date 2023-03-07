import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import IQuiz from "../../models/Quiz";

import Header from "./Header";
import ToastCard from "../../components/Card/ToastCard";

import { Card, Col, FormGroup, Input, Label, Row, Form } from "reactstrap";

interface SingleQuiz {
  question: string;
  choices: Array<{
    answer: string;
    isCorrect: boolean;
  }>;
}

function Edit() {
  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getQuiz = async () => {
      const response = await fetch(
        process.env.REACT_APP_API_URI + "quiz/" + id,
        {
          headers: {
            Authorization: `Bearer ${user!.token}`,
          },
        }
      );

      const json = await response.json();

      if (response.ok) {
        setQuiz(json);
      }
    };

    if (user) getQuiz();
  }, [user, id]);

  const handleUpdateQuestion = (object: SingleQuiz, value: string) => {
    const index = quiz!.quizzes.indexOf(object);
    quiz!.quizzes[index].question = value;
    setQuiz(quiz);
  };

  const handleUpdateAnswers = (
    object: SingleQuiz,
    answerIndex: number,
    value: string
  ) => {
    const quizIndex = quiz!.quizzes.indexOf(object);
    quiz!.quizzes[quizIndex].choices[answerIndex].answer = value;
    setQuiz(quiz);
  };

  const handleUpdateChoice = (object: SingleQuiz, choiceIndex: number) => {
    const quizIndex = quiz!.quizzes.indexOf(object);
    switch (choiceIndex) {
      case 0:
        quiz!.quizzes[quizIndex].choices[0].isCorrect = true;
        quiz!.quizzes[quizIndex].choices[1].isCorrect = false;
        quiz!.quizzes[quizIndex].choices[2].isCorrect = false;
        return setQuiz(quiz);
      case 1:
        quiz!.quizzes[quizIndex].choices[0].isCorrect = false;
        quiz!.quizzes[quizIndex].choices[1].isCorrect = true;
        quiz!.quizzes[quizIndex].choices[2].isCorrect = false;
        return setQuiz(quiz);
      case 2:
        quiz!.quizzes[quizIndex].choices[0].isCorrect = false;
        quiz!.quizzes[quizIndex].choices[1].isCorrect = false;
        quiz!.quizzes[quizIndex].choices[2].isCorrect = true;
        return setQuiz(quiz);
      default:
        throw new Error("Invalid Index");
    }
  };

  const handleDelete = async () => {
    const response = await fetch(process.env.REACT_APP_API_URI + "quiz/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearrers ${user?.token}`,
      },
    });

    if (response.ok) {
      navigate("/quiz");
    }
  };

  const handleSubmit = async (title: string, due: string) => {
    const response = await fetch(process.env.REACT_APP_API_URI + "quiz/" + id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, due, quizzes: quiz!.quizzes }),
    });

    const json = await response.json();

    if (response.ok) {
      setQuiz(json);
      setDisabled(true);
    } else {
      setError(json.error.message);
      setTimeout(() => {
        setError(null);
      }, 3500);
    }
  };

  return (
    <Col className="my-3">
      <Row>
        {quiz && (
          <Header
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            disabled={disabled}
            setDisabled={setDisabled}
            questionLength={quiz.quizzes.length}
            quiz={quiz}
          />
        )}
        {error && <ToastCard message={error} color="danger" />}
      </Row>
      <Row className="d-flex justify-content-center">
        <Col md="7">
          {quiz &&
            quiz.quizzes.map((q) => (
              <Card className="p-3 mt-3" key={q.question}>
                <Form>
                  <Input
                    placeholder="Question"
                    className="mb-3"
                    name="question"
                    disabled={disabled}
                    defaultValue={q.question}
                    onChange={(e) => handleUpdateQuestion(q, e.target.value)}
                  />
                  <FormGroup>
                    <Input
                      type="radio"
                      id="choice1"
                      name="choice"
                      className="me-2 mt-2"
                      disabled={disabled}
                      defaultChecked={q.choices[0].isCorrect}
                      onChange={() => handleUpdateChoice(q, 0)}
                    />
                    <Label for="choice1">
                      <Input
                        placeholder="Answer"
                        bsSize="sm"
                        defaultValue={q.choices[0].answer}
                        disabled={disabled}
                        onChange={(e) =>
                          handleUpdateAnswers(q, 0, e.target.value)
                        }
                      />
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="radio"
                      id="choice2"
                      name="choice"
                      className="me-2 mt-2"
                      defaultChecked={q.choices[1].isCorrect}
                      disabled={disabled}
                      onChange={() => handleUpdateChoice(q, 1)}
                    />
                    <Label for="choice2">
                      <Input
                        placeholder="Answer"
                        bsSize="sm"
                        defaultValue={q.choices[1].answer}
                        disabled={disabled}
                        onChange={(e) =>
                          handleUpdateAnswers(q, 1, e.target.value)
                        }
                      />
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="radio"
                      id="choice3"
                      name="choice"
                      className="me-2 mt-2"
                      defaultChecked={q.choices[2].isCorrect}
                      disabled={disabled}
                      onChange={() => handleUpdateChoice(q, 2)}
                    />
                    <Label for="choice3">
                      <Input
                        placeholder="Answer"
                        bsSize="sm"
                        defaultValue={q.choices[2].answer}
                        disabled={disabled}
                        onChange={(e) =>
                          handleUpdateAnswers(q, 2, e.target.value)
                        }
                      />
                    </Label>
                  </FormGroup>
                </Form>
              </Card>
            ))}
        </Col>
      </Row>
    </Col>
  );
}

export default Edit;
