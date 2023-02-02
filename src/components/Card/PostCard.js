import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";

import {
  Card,
  CardBody,
  CardHeader,
  CardSubtitle,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
} from "reactstrap";
import Avatar from "../../assets/default-avatar.png";

export const PostCard = ({ post }) => {
  const [modal, setModal] = useState(false);
  const [expand, setExpand] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const card = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleModal = () => setModal(!modal);
  const toggleExpand = () => setExpand(!expand);

  const rtf = new Intl.RelativeTimeFormat("en", { style: "narrow" });
  const diff = new Date() - new Date(post.createdAt);
  const days = Array.from(diff.toString())[0];
  const minutes =
    new Date().getMinutes() - new Date(post.createdAt).getMinutes();

  const handleDelete = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URI}${id}`, {
      method: "DELETE",
    });
  };

  return (
    <>
      <Card className="mt-3 post-card rounded-top">
        <CardHeader className="d-flex align-items-center bg-white border-0">
          <div>
            <img
              src={Avatar}
              className="rounded-circle me-2"
              alt=""
              width="40"
            />
            Jhon <span className="text-muted">Posted to</span>
            <span className="text-primary">THS1</span>
          </div>
          <CardSubtitle className="text-muted ms-2">
            {diff > 100000000
              ? rtf.format(-days, "days")
              : rtf.format(-minutes, "minutes")}
          </CardSubtitle>
          <Dropdown
            toggle={toggleDropdown}
            isOpen={dropdownOpen}
            className="ms-auto"
          >
            <DropdownToggle data-toggle="dropdown" tag="span">
              <Button color="transparent">
                <i className="fas fa-ellipsis-h" aria-hidden="true"></i>
              </Button>
            </DropdownToggle>
            <DropdownMenu>
              <Link to={`/post/${post._id}/edit`} className="dropdown-item">
                Edit
              </Link>
              <Link
                onClick={() => handleDelete(post._id)}
                className="dropdown-item"
              >
                Delete
              </Link>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        <Link
          onClick={toggleModal}
          className="overflow-hidden"
          style={
            expand
              ? { maxHeight: card.current.clientHeight }
              : { maxHeight: "200px" }
          }
        >
          <CardBody innerRef={card}>
            <ReactQuill value={post.content} theme={"bubble"} readOnly={true} />
          </CardBody>
        </Link>
        {card.current && card.current.clientHeight > 200 && !expand && (
          <p
            role="button"
            onClick={toggleExpand}
            className="ms-auto me-5 text-primary toggle-see"
          >
            ...see more
          </p>
        )}
      </Card>
      <div className="d-flex justify-content-around btn-group w-100 post-btn rounded-">
        <Button>
          <i className="fa-regular fa-thumbs-up me-2"></i>Like
        </Button>
        <Button onClick={toggleModal}>
          <i className="fa-regular fa-message me-2"></i>Comment
        </Button>
      </div>

      <Modal scrollable={true} isOpen={modal} toggle={toggleModal} size="lg">
        <ModalHeader tag="h6" toggle={toggleModal}>
          Jhon <span className="text-muted">Posted to</span>{" "}
          <span className="text-primary">THS1</span>
          <CardSubtitle className="text-muted">
            {diff > 100000000
              ? rtf.format(-days, "days")
              : rtf.format(-minutes, "minutes")}
          </CardSubtitle>
        </ModalHeader>
        <ModalBody>
          <ReactQuill value={post.content} theme={"bubble"} readOnly={true} />
          <div className="pt-3 border-top btn-group w-100">
            <Button className="main-btn">
              <i className="fa-regular fa-thumbs-up me-2"></i>Like
            </Button>
            <Button className="main-btn">
              <i className="fa-regular fa-message me-2"></i>Comment
            </Button>
          </div>
          <Card className="mt-3">
            <CardBody className="d-flex align-items-start">
              <img
                src={Avatar}
                className="rounded-circle me-2"
                alt=""
                width="30"
              />
              <div className="d-flex flex-column px-3 py-2 rounded comment-content">
                <span>Jhon doe 1 hour ago</span>
                <span>Lorem ipsum</span>
              </div>
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Form className="d-flex w-100 gap-2">
            <Input />
            <Button className="main-btn">Comment</Button>
          </Form>
        </ModalFooter>
      </Modal>
    </>
  );
};
