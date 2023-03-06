import React, { FormEvent, useState } from "react";

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
  handleSubmit: (title: string, date: string) => void;
}

function Header({ questionLength, handleSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit(title, due);
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

        <Button onClick={handleSave}>Save</Button>
      </Navbar>
    </Col>
  );
}

export default Header;
