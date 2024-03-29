import React, { useRef, useMemo, useState, useEffect, FormEvent } from "react";
import ReactQuill, { Quill } from "react-quill";
import ReactSelect from "react-select";
import ImageResize from "quill-image-resize-module-react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFetch } from "../../hooks/useFetch";
import ToastCard from "../Card/ToastCard";
import QuizForm from "./QuizForm";
import { Button, ButtonGroup, Col, Form, Row, Spinner } from "reactstrap";
import "react-quill/dist/quill.snow.css";

interface Props {
  handleSubmit: (e: FormEvent) => void;
  form: string;
  setForm: React.Dispatch<React.SetStateAction<string>>;
  pending: boolean;
  setRooms?: React.Dispatch<React.SetStateAction<any>>;
  isEditing?: boolean;
}

interface Options {
  value: string;
  label: string;
}

function RichTextForm({
  handleSubmit,
  form,
  setForm,
  pending,
  setRooms,
  isEditing,
}: Props) {
  const [tab, setTab] = useState<"text" | "quiz">("text");
  const [options, setOptions] = useState<Options[]>([]);
  const [imageUpload, setImageUpload] = useState(false);
  const ref = useRef<any>(null);
  const { user } = useAuthContext();
  const { get } = useFetch();

  useEffect(() => {
    const fetchRooms = async () => {
      const rooms = await get("/room");
      if (!rooms.error) {
        const options: Options[] = [];
        for (let room of rooms) {
          const option = { value: room._id, label: room.name };
          options.push(option);
        }
        setOptions(options);
      }
    };
    if (user) fetchRooms();
  }, [user]); // eslint-disable-line

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
      if (input.files) formData.append("image", input.files[0]);
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/post/uploadimage`,
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
    <Col className="mt-3">
      <Col className="d-flex justify-content-center">
        <ButtonGroup className="w-50">
          <Button
            data-cy="toggle-text"
            active={tab === "text"}
            onClick={() => setTab("text")}
          >
            Text
          </Button>
          <Button
            data-cy="toggle-quiz"
            active={tab === "quiz"}
            onClick={() => setTab("quiz")}
          >
            Quiz
          </Button>
        </ButtonGroup>
      </Col>
      {tab === "text" && (
        <Col className="create mt-3">
          {imageUpload && (
            <ToastCard
              spinner={true}
              message={"Uploading image..."}
              color={"primary"}
            />
          )}
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
                    data-cy="select-room"
                    className="w-100"
                    isMulti={true}
                    placeholder="Select rooms"
                    options={options}
                    onChange={(selected) => setRooms!(selected)}
                    isDisabled={isEditing}
                  />

                  <Button
                    disabled={pending}
                    data-cy="post"
                    type="submit"
                    className="main-btn ms-auto"
                  >
                    {pending ? <Spinner /> : "Post"}
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Col>
      )}

      {tab === "quiz" && <QuizForm />}
    </Col>
  );
}

export default RichTextForm;
