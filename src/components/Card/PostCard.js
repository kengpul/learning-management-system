import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

import { ToastCard } from "./ToastCard";

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
  Spinner,
} from "reactstrap";
import Avatar from "../../assets/default-avatar.png";

export const PostCard = ({ post }) => {
  const [modal, setModal] = useState(false);
  const [expand, setExpand] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [comment, setComment] = useState("");
  const { destroy, create, pending, error } = useFetch();

  const card = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleModal = () => setModal(!modal);
  const toggleExpand = () => setExpand(!expand);

  const created = new Date(post.createdAt);
  const days = new Date().getUTCDate() - created.getUTCDate();
  const hours = new Date().getHours() - new Date(post.createdAt).getHours();
  const minutes = Math.round(
    (new Date().getTime() - new Date(post.createdAt).getTime()) / 60000
  );

  const handleDates = () => {
    if (days > 0) {
      return `${days}d`;
    } else if (hours > 0 && days < 1) {
      return `${hours}h`;
    } else if (minutes > 0 && hours < 1 && days < 1) {
      return `${minutes}m`;
    } else {
      return "now";
    }
  };

  const handleDelete = async (id) => {
    const url = process.env.REACT_APP_API_URI + id;
    await destroy(url, "DELETE", "DELETE_POST");
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URI}${post._id}/comment`;
    await create(url, "POST", "EDIT_POST", comment);
    setComment("");
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
            {handleDates()}
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
                {pending ? <Spinner /> : "Delete"}
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

      <Modal
        className="modal-post"
        scrollable={true}
        isOpen={modal}
        toggle={toggleModal}
        size="lg"
      >
        <ModalHeader tag="h6" toggle={toggleModal}>
          Jhon <span className="text-muted">Posted to</span>{" "}
          <span className="text-primary">THS1</span>
          <span className="ms-2 text-muted">{handleDates()}</span>
        </ModalHeader>
        <ModalBody>
          {error && <ToastCard message={error} color={"danger"} />}
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
            {post.comments &&
              post.comments.map((comment) => (
                <CardBody
                  key={comment._id}
                  className="d-flex align-items-start"
                >
                  <img
                    src={Avatar}
                    className="rounded-circle me-2"
                    alt=""
                    width="30"
                  />
                  <div className="d-flex flex-column px-3 py-2 rounded comment-content">
                    <span>1 hour ago</span>
                    <span>{comment.content}</span>
                  </div>
                </CardBody>
              ))}
          </Card>
        </ModalBody>
        <ModalFooter>
          <Form onSubmit={handleComment} className="d-flex w-100 gap-2">
            <Input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button className="main-btn" disabled={pending}>
              {pending ? <Spinner /> : "Comment"}
            </Button>
          </Form>
        </ModalFooter>
      </Modal>
    </>
  );
};
