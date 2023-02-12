import { useRef, useMemo, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import ReactSelect from "react-select";
import ImageResize from "quill-image-resize-module-react";

import { ToastCard } from "../Card/ToastCard";

import { Button, Col, Form, Row, Spinner } from "reactstrap";
import "react-quill/dist/quill.snow.css";

export const RichTextForm = ({ handleSubmit, form, setForm, pending }) => {
  const [imageUpload, setImageUpload] = useState(false);
  const ref = useRef(null);

  const imageHandler = () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("name", "content-photo");
    input.click();

    input.onchange = async () => {
      setImageUpload(true);
      const formData = new FormData();
      formData.append("image", input.files[0]);

      const response = await fetch(
        `${process.env.REACT_APP_API_URI}post/uploadimage`,
        {
          method: "POST",
          body: formData,
        }
      );

      const path = await response.json();

      if (response.ok) {
        if (ref.current) {
          const index = ref.current.selection.index;
          ref.current.getEditor().insertEmbed(index, "image", path);
        }
      }
      setImageUpload(false);
    };
  };

  Quill.register("modules/imageHandler", imageHandler);
  Quill.register("modules/imageResize", ImageResize);
  Quill.debug("error");

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["code-block"],
          ["image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },

      imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"],
      },
    }),
    []
  );

  const groupOptions = [
    { value: "THS1", label: "Thesis Writing 1" },
    { value: "THS2", label: "Thesis Writing 2" },
    { value: "CSPRAC", label: "CS Practicum" },
  ];

  return (
    <Col className="create">
      {imageUpload && (
        <ToastCard
          spinner={true}
          message={"Uploading image..."}
          color={"primary"}
        />
      )}
      <h1 className="">Create post</h1>
      <p className="text-muted border-bottom mb-3 pb-2">
        Type formatted post, Select groups/classes.
      </p>
      <Row className="mx-lg-auto">
        <Col md="7" className="mb-3 mx-auto">
          <Form onSubmit={handleSubmit}>
            <ReactQuill
              className="bg-white"
              theme="snow"
              placeholder="Type your post here"
              modules={modules}
              value={form}
              onChange={(e) => setForm(e)}
              ref={ref}
            />
            <div className="d-flex gap-2 mt-2">
              <ReactSelect
                className="w-100"
                isMulti="true"
                placeholder="Choose a group or class"
                options={groupOptions}
              />
              <Button disabled={pending} type="submit" className="main-btn">
                {pending ? <Spinner /> : "Post"}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Col>
  );
};
