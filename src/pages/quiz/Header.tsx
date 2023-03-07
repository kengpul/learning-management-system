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
  quiz?: IQuiz;
}

function Header({ questionLength, handleSubmit, quiz }: Props) {
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");

  useEffect(() => {
    if (quiz) {
      setTitle(quiz.title);
      setDue(quiz.due);
    }
  }, []);

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
            onChange={(e) => setDue(e.target.value)}
          />
        </NavbarText>

        <NavbarText className="me-3">Timer: 60 minutes</NavbarText>
        <NavbarText>Questions: {questionLength}</NavbarText>

        <Button onClick={handleSave}>{quiz ? "Edit" : "Save"}</Button>
      </Navbar>
    </Col>
  );
}

export default Header;
