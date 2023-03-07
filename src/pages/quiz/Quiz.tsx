import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import IQuiz from "../../models/Quiz";

import Header from "./Header";

import { Card, Col, FormGroup, Input, Label, Row, Form } from "reactstrap";

interface SingleQuiz {
  question: string;
  choices: Array<{
    answer: string;
    isCorrect: boolean;
  }>;
}

function Quiz() {
  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const { user } = useAuthContext();
  const { id } = useParams();

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

  const handleSubmit = (title: string, due: string) => {
    console.log(title, due);
    console.log(quiz);
  };

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

  return (
    <Col className="my-3">
      <Row>
        {quiz && (
          <Header
            handleSubmit={handleSubmit}
            questionLength={quiz.quizzes.length}
            quiz={quiz}
          />
        )}
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
                    defaultValue={q.question}
                    onChange={(e) => handleUpdateQuestion(q, e.target.value)}
                  />
                  <FormGroup>
                    <Input
                      type="radio"
                      id="choice1"
                      name="choice"
                      className="me-2 mt-2"
                      defaultChecked={q.choices[0].isCorrect}
                      onChange={(e) => handleUpdateChoice(q, 0)}
                    />
                    <Label for="choice1">
                      <Input
                        placeholder="Answer"
                        bsSize="sm"
                        defaultValue={q.choices[0].answer}
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
                      onChange={(e) => handleUpdateChoice(q, 1)}
                    />
                    <Label for="choice2">
                      <Input
                        placeholder="Answer"
                        bsSize="sm"
                        defaultValue={q.choices[1].answer}
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
                      onChange={(e) => handleUpdateChoice(q, 2)}
                    />
                    <Label for="choice3">
                      <Input
                        placeholder="Answer"
                        bsSize="sm"
                        defaultValue={q.choices[2].answer}
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

export default Quiz;
