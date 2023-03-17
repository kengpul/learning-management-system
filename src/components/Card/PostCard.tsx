import React, { useState, useRef, FormEvent } from "react";
import ReactQuill from "react-quill";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Post, { Request } from "../../models/Post";
import { Method } from "../../models/enums";
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
import { useFetch } from "../../hooks/useFetch";
import { usePostsContext } from "../../hooks/usePostsContext";

function PostCard({ post }: { post: Post }) {
  const [modal, setModal] = useState(false);
  const [expand, setExpand] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [comment, setComment] = useState("");
  const { user } = useAuthContext();
  const { modify: postRequest, destroy, isPending, error } = useFetch();
  const { dispatch } = usePostsContext();
  const navigate = useNavigate();

  const card = useRef<HTMLElement>(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleModal = () => setModal(!modal);
  const toggleExpand = () => setExpand(!expand);

  const handleDates = (content: string) => {
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

  const handleDelete = async (id: string) => {
    const post = await destroy(`/post/${id}`);
    if (!post.error) {
      dispatch!({ type: Request.DELETE_POST, payload: post });
    }
  };

  const handleLike = async (e: FormEvent) => {
    e.preventDefault();
    const url = `/post/${post._id}/like`;
    const postResponse = await postRequest(url, Method.POST, {
      content: user!.username,
    });
    if (!postResponse.error) {
      dispatch!({ type: Request.EDIT_POST, payload: postResponse });
      navigate("/feed/");
    }
  };

  const handleComment = async (e: FormEvent) => {
    e.preventDefault();
    const url = `/post/${post._id}/comment`;
    const postResponse = await postRequest(url, Method.POST, {
      content: comment,
    });
    if (!postResponse.error) {
      dispatch!({ type: Request.EDIT_POST, payload: postResponse });
      navigate("/feed/");
    }
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
            {post.author.username}{" "}
            <span className="text-muted">Posted to </span>
            <Link to={`/room/${post.room._id}`}>
              <span className="text-primary">{post.room.name}</span>
            </Link>
          </div>
          <CardSubtitle className="text-muted ms-2">
            {handleDates(post.createdAt)}
          </CardSubtitle>
          {user?.username === post.author.username && (
            <Dropdown
              toggle={toggleDropdown}
              isOpen={dropdownOpen}
              className="ms-auto"
            >
              <DropdownToggle data-toggle="dropdown" tag="span">
                <Button color="transparent">
                  <i
                    className="fas fa-ellipsis-h"
                    aria-hidden="true"
                    data-cy="toggle-modify-post"
                  ></i>
                </Button>
              </DropdownToggle>
              <DropdownMenu>
                <Link
                  to={`/post/${post._id}/edit`}
                  className="dropdown-item"
                  data-cy="toggle-edit"
                >
                  Edit
                </Link>
                <Link
                  to=""
                  onClick={() => handleDelete(post._id)}
                  className="dropdown-item"
                  data-cy="toggle-delete"
                >
                  {isPending ? <Spinner /> : "Delete"}
                </Link>
              </DropdownMenu>
            </Dropdown>
          )}
        </CardHeader>
        <Link
          to=""
          onClick={toggleModal}
          className="overflow-hidden"
          style={
            expand
              ? { maxHeight: card.current?.clientHeight }
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
          {post.author.username} <span className="text-muted">Posted to </span>
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
            <Button className="main-btn" disabled={isPending}>
              {isPending ? <Spinner /> : "Comment"}
            </Button>
          </Form>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default PostCard;
