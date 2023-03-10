import React, { useEffect, useState } from "react";
import { usePostsContext } from "../../hooks/usePostsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

import PostCard from "../../components/Card/PostCard";
import ListCard from "../../components/Card/ListCard";
import CreatePostButton from "../../components/Card/CreatePostButton";
import Room from "../../models/Room";

import { Col, Spinner } from "reactstrap";
import "./post.css";
import { Request } from "../../models/Post";

export default function Feed() {
  const [pending, setPending] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPost = async () => {
      setPending(true);
      const response = await fetch(process.env.REACT_APP_API_URI + "post", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearers ${user?.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch!({ type: Request.GET_POSTS, payload: json });
      }
      setPending(false);
    };

    const fetchRooms = async () => {
      const response = await fetch(process.env.REACT_APP_API_URI + "room", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearers ${user?.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setRooms(json);
      }
    };

    if (user) {
      fetchPost();
      fetchRooms();
    }
  }, [dispatch, user]);

  return (
    <Col className="d-lg-flex gap-lg-3 justify-content-lg-center post mt-3">
      <Col lg="7">
        <CreatePostButton />
        {pending && (
          <div className="text-center text-muted mt-5">
            <Spinner />
            <p className="mt-1">Loading posts...</p>
          </div>
        )}
        {posts && posts.map((post) => <PostCard key={post._id} post={post} />)}
      </Col>

      <Col lg="3">
        <ListCard title={"Quizes"} />
        <ListCard title={"Rooms"} items={rooms} />
      </Col>
    </Col>
  );
}
