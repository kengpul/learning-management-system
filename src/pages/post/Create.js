import { useState } from "react";
import ReactQuill from "react-quill";
import ReactSelect from "react-select";

import { Button, Col, Row } from "reactstrap";
import "react-quill/dist/quill.snow.css";

export const Create = () => {
  const [form, setForm] = useState("");

  const toolbarOptions = [
    { size: ["small", false, "large", "huge"] },
    "bold",
    "italic",
    "underline",
    { list: "ordered" },
    { list: "bullet" },
    "code-block",
    // "image",
    "clean",
  ];

  const groupOptions = [
    { value: "THS1", label: "Thesis Writing 1" },
    { value: "THS2", label: "Thesis Writing 2" },
    { value: "CSPRAC", label: "CS Practicum" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <Col className="create">
      <h1 className="">Create post</h1>
      <p className="text-muted border-bottom mb-3 pb-2">
        Type formatted post, Select groups/classes.
      </p>
      <Row className="mx-lg-auto">
        <Col md="8" className="mb-3 mx-auto">
          <ReactQuill
            className="bg-white"
            theme="snow"
            placeholder="Type your post here"
            modules={{
              toolbar: toolbarOptions,
            }}
            value={form}
            onChange={(e) => setForm(e)}
          />
          <div className="d-flex gap-2 mt-2">
            <ReactSelect
              className="w-100"
              isMulti="true"
              placeholder="Choose a group or class"
              options={groupOptions}
            />
            <Button onClick={handleSubmit} className="main-btn ">
              Post
            </Button>
          </div>
        </Col>
      </Row>
    </Col>
  );
};
