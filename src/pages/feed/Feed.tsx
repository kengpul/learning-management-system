import React, { useEffect, useState } from "react";
import { usePostsContext } from "../../hooks/usePostsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Request } from "../../models/Post";
import { useFetch } from "../../hooks/useFetch";
import PostCard from "../../components/Card/PostCard";
import ListCard from "../../components/Card/ListCard";
import CreatePostButton from "../../components/Card/CreatePostButton";
import Room from "../../models/Room";
import ToastCard from "../../components/Card/ToastCard";
import { Col, Spinner } from "reactstrap";
import "./post.css";

export default function Feed() {
  const [success, setSuccess] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();
  const { error, isPending, get } = useFetch();

  useEffect(() => {
    const fetchPost = async () => {
      const posts = await get("/post");
      if (posts) dispatch!({ type: Request.GET_POSTS, payload: posts });
      setSuccess(true);
    };
    const fetchRooms = async () => {
      const rooms = await get("/room");
      if (rooms) setRooms(rooms);
    };

    if (user) {
      fetchPost();
      fetchRooms();
    }
  }, [user, success, dispatch]); // eslint-disable-line

  return (
    <Col className="d-lg-flex gap-lg-3 justify-content-lg-center post mt-3">
      {error && <ToastCard message={error} color="danger" />}
      <Col lg="7">
        <CreatePostButton />
        {isPending && (
          <div className="text-center text-muted mt-5">
            <Spinner />
            <p className="mt-1">Loading posts...</p>
          </div>
        )}
        {posts && posts.map((post) => <PostCard key={post._id} post={post} />)}
      </Col>

      <Col lg="3">
        <ListCard title={"Quizes"} link={"/quiz/"} />
        <ListCard title={"Rooms"} items={rooms} link={"/room/"} />
      </Col>
    </Col>
  );
}
