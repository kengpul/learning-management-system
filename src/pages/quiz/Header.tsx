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
  disabled?: boolean;
  setDisabled?: React.Dispatch<React.SetStateAction<boolean>>;
  quiz?: IQuiz;
}

function Header({
  questionLength,
  disabled,
  setDisabled,
  handleSubmit,
  quiz,
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
        <NavbarBrand>
          <Input
            placeholder="Title"
            value={title}
            disabled={disabled}
            onChange={(e) => setTitle(e.target.value)}
          />
        </NavbarBrand>

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

        <NavbarText className="me-3">Timer: 60 minutes</NavbarText>
        <NavbarText>Questions: {questionLength}</NavbarText>

        {quiz && disabled ? (
          <Button onClick={() => setDisabled!(false)}>Edit</Button>
        ) : (
          <Button onClick={handleSave}>Save</Button>
        )}
      </Navbar>
    </Col>
  );
}

export default Header;
