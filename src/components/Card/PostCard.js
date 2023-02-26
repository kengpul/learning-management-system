import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useAuthContext } from "../../hooks/useAuthContext";

import ToastCard from "./ToastCard";

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

export default function PostCard({ post }) {
  const [modal, setModal] = useState(false);
  const [expand, setExpand] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [comment, setComment] = useState("");
  const { destroy, create, pending, error } = useFetch();
  const { user } = useAuthContext();

  const card = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleModal = () => setModal(!modal);
  const toggleExpand = () => setExpand(!expand);

  const handleDates = (content) => {
    const created = new Date(content);
    const days = new Date().getUTCDate() - created.getUTCDate();
    const hours = new Date().getHours() - new Date(content).getHours();
    const minutes = Math.round(
      (new Date().getTime() - new Date(content).getTime()) / 60000
    );

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
    const url = `${process.env.REACT_APP_API_URI}post/${id}`;
    await destroy(url, "DELETE", "DELETE_POST");
  };

  const handleLike = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URI}post/${post._id}/like`;
    await create(url, "POST", "EDIT_POST", user.username);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URI}post/${post._id}/comment`;
    await create(url, "POST", "EDIT_POST", comment);
    setComment("");
  };

  return (
    <>
      <Card className="mt-3 post-card rounded-top">
        <CardHeader className="d-flex align-items-center bg-white border-0">
          <div>
            <img
              src="https://res.cloudinary.com/dsjrdrewd/image/upload/v1676885960/learning-management-system/assets/default-avatar_hk6j0v.png"
              className="rounded-circle me-2"
              alt=""
              width="40"
            />
            {user.username} <span className="text-muted">Posted to </span>
            <Link to={`/room/${post.room._id}`}>
              <span className="text-primary">{post.room.name}</span>
            </Link>
          </div>
          <CardSubtitle className="text-muted ms-2">
            {handleDates(post.createdAt)}
          </CardSubtitle>
          {user.username === post.author.username && (
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
          )}
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
        <Button onClick={handleLike}>
          <i className="fa-regular fa-thumbs-up me-1"></i>
          {post.likes.length} Like
        </Button>
        <Button onClick={toggleModal}>
          <i className="fa-regular fa-message me-1"></i>
          {post.comments.length} Comment
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
          {user.username} <span className="text-muted">Posted to </span>
          <Link to={`/room/${post.room._id}`}>
            <span className="text-primary">{post.room.name}</span>
          </Link>
          <span className="ms-2 text-muted">{handleDates(post.createdAt)}</span>
        </ModalHeader>
        <ModalBody>
          {error && <ToastCard message={error} color={"danger"} />}
          <ReactQuill value={post.content} theme={"bubble"} readOnly={true} />
          <Card className="mt-3">
            {post.comments &&
              post.comments.map((comment) => (
                <CardBody
                  key={comment._id}
                  className="d-flex align-items-start"
                >
                  <img
                    src="https://res.cloudinary.com/dsjrdrewd/image/upload/v1676885960/learning-management-system/assets/default-avatar_hk6j0v.png"
                    className="rounded-circle me-2"
                    alt=""
                    width="30"
                  />
                  <div className="d-flex flex-column px-3 py-2 rounded comment-content">
                    <span>
                      {comment.username} {handleDates(comment.date)}
                    </span>
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
}
