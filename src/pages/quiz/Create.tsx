import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

import Header from "./Header";

import {
  Row,
  Col,
  Input,
  Card,
  FormGroup,
  Label,
  Form,
  Button,
} from "reactstrap";
import ToastCard from "../../components/Card/ToastCard";

interface Quiz {
  question: string;
  choices: Array<{ answer: string; isCorrect: boolean }>;
}

function Create() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [question, setQuestion] = useState("");
  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");
  const [choice3, setChoice3] = useState("");
  const [checked, setChecked] = useState({
    choice1: false,
    choice2: false,
    choice3: false,
  });
  const [isBlank, setIsBlank] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const { user } = useAuthContext();

  const reset = () => {
    setQuestion("");
    setChoice1("");
    setChoice2("");
    setChoice3("");
    setChecked({
      choice1: false,
      choice2: false,
      choice3: false,
    });
  };

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    const quiz = {
      question,
      choices: [
        { answer: choice1, isCorrect: checked.choice1 },
        { answer: choice2, isCorrect: checked.choice2 },
        { answer: choice3, isCorrect: checked.choice3 },
      ],
    };

    quizzes.push(quiz);
    setQuizzes(quizzes);
    reset();
  };

  useEffect(() => {
    if (!choice1 || !choice2 || !choice3) {
      setIsBlank(true);
    } else {
      setIsBlank(false);
    }
  }, [choice1, choice2, choice3]);

  const handleSubmit = async (title: string, due: string) => {
    const response = await fetch(process.env.REACT_APP_API_URI + "quiz", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, due, quizzes }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error.message);
      setTimeout(() => {
        setError(null);
      }, 3500);
    }
  };

  return (
    <Col className="mt-3">
      <Row>
        <Header handleSubmit={handleSubmit} questionLength={quizzes.length} />
        {error && <ToastCard message={error} color="danger" />}
      </Row>
      <Row className="d-flex justify-content-center mt-3">
        <Col md="7">
          <Card className="p-3">
            <Form onSubmit={handleAdd}>
              <Input
                placeholder="Question"
                className="mb-3"
                name="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <FormGroup>
                <Input
                  type="radio"
                  id="choice1"
                  name="choice"
                  className="me-2 mt-2"
                  onChange={(e) =>
                    setChecked({
                      choice1: e.target.checked || true,
                      choice2: false,
                      choice3: false,
                    })
                  }
                />
                <Label for="choice1">
                  <Input
                    placeholder="Answer"
                    bsSize="sm"
                    value={choice1}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setChoice1(e.target.value)
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
                  onChange={(e) =>
                    setChecked({
                      choice1: false,
                      choice2: e.target.checked || true,
                      choice3: false,
                    })
                  }
                />
                <Label for="choice2">
                  <Input
                    placeholder="Answer"
                    bsSize="sm"
                    value={choice2}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setChoice2(e.target.value)
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
                  onChange={(e) =>
                    setChecked({
                      choice1: false,
                      choice2: false,
                      choice3: e.target.checked || true,
                    })
                  }
                />
                <Label for="choice3">
                  <Input
                    placeholder="Answer"
                    bsSize="sm"
                    value={choice3}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setChoice3(e.target.value)
                    }
                  />
                </Label>
              </FormGroup>
              <Button className="main-btn w-100" disabled={isBlank}>
                Add
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Col>
  );
}
export default Create;
