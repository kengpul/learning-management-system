import React from "react";
import PostCard from "../../components/Card/PostCard";
import Post from "../../models/Post";
import { Col } from "reactstrap";

interface Props {
  posts: Post[];
}

function Posts({ posts }: Props) {
  return (
    <Col md="7">
      <div className="post">
        {posts &&
          posts.length > 0 &&
          posts.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
    </Col>
  );
}

export default Posts;
