import { useRef, useMemo, useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import ReactSelect from "react-select";
import ImageResize from "quill-image-resize-module-react";
import { useAuthContext } from "../../hooks/useAuthContext";

import ToastCard from "../Card/ToastCard";

import { Button, Col, Form, Row, Spinner } from "reactstrap";
import "react-quill/dist/quill.snow.css";

function RichTextForm({ handleSubmit, form, setForm, pending, setRooms }) {
  const [options, setOptions] = useState([]);
  const [imageUpload, setImageUpload] = useState(false);
  const ref = useRef(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch(process.env.REACT_APP_API_URI + "room", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        const options = [];
        for (let room of json) {
          const option = { value: room._id, label: room.name };
          options.push(option);
        }
        setOptions(options);
      }
    };
    if (user) fetchRooms();
  }, [user]);

  const imageHandler = () => {
    if (!user) return;
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
          headers: { Authorization: `Bearers ${user.token}` },
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
    // eslint-disable-next-line
    []
  );

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
                placeholder="Rooms"
                options={options}
                onChange={(selected) => setRooms(selected)}
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
}

export default RichTextForm;
