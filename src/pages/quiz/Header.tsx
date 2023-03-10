import React, { FormEvent, useEffect, useState } from "react";
import IQuiz from "../../models/Quiz";

import {
  Button,
  Col,
  Input,
  Label,
  Navbar,
  NavbarBrand,
  NavbarText,
} from "reactstrap";

interface Props {
  questionLength: number;
  handleSubmit?: (title: string, date: string) => void;
  handleDelete?: () => void;
  handlePublish?: () => void;
  disabled?: boolean;
  setDisabled?: React.Dispatch<React.SetStateAction<boolean>>;
  quiz?: IQuiz;
  timer?: string;
  isStudent?: boolean;
}

function Header({
  questionLength,
  disabled,
  setDisabled,
  handleSubmit,
  handlePublish,
  handleDelete,
  quiz,
  timer,
  isStudent,
}: Props) {
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");

  useEffect(() => {
    if (quiz) {
      setTitle(quiz.title);
      setDue(quiz.due);
    }
  }, [quiz]);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit!(title, due);
  };

  return (
    <Col>
      <Navbar
        className="rounded"
        style={{ backgroundColor: "var(--light-blue)" }}
        dark
      >
        {isStudent ? (
          <NavbarBrand>
            <h5 className="text-white">{title}</h5>
          </NavbarBrand>
        ) : (
          <NavbarBrand>
            <Input
              placeholder="Title"
              value={title}
              disabled={disabled}
              onChange={(e) => setTitle(e.target.value)}
            />
          </NavbarBrand>
        )}

        {!isStudent && (
          <NavbarText className="d-flex align-items-center">
            <Label for="due" className="me-2 mt-2">
              Due:
            </Label>
            <Input
              type="date"
              id="due"
              name="due"
              value={due}
              disabled={disabled}
              onChange={(e) => setDue(e.target.value)}
            />
          </NavbarText>
        )}

        <NavbarText className="me-3">
          Timer: {timer ? timer : "60 minutes"}
        </NavbarText>
        {!isStudent ? (
          <>
            <NavbarText>Questions: {questionLength}</NavbarText>

            {quiz && (
              <Button color="danger" onClick={handleDelete}>
                Delete
              </Button>
            )}

            {quiz && disabled ? (
              <Button onClick={() => setDisabled!(false)}>Edit</Button>
            ) : (
              <Button onClick={handleSave}>Save</Button>
            )}
          </>
        ) : (
          <>
            <NavbarText>
              Questions: {questionLength}/{quiz?.quizzes.length}
            </NavbarText>
            <Button onClick={handlePublish}>Submit</Button>
          </>
        )}
      </Navbar>
    </Col>
  );
}

export default Header;
