import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostsContext } from "../../hooks/usePostsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFetch } from "../../hooks/useFetch";
import { Request } from "../../models/Post";
import CreatePostButton from "../../components/Card/CreatePostButton";
import PostCard from "../../components/Card/PostCard";

function Post() {
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();
  const { id } = useParams();
  const { get } = useFetch();

  useEffect(() => {
    const fetchPost = async () => {
      const post = await get(`/room/${id}`);
      if (!post.error) {
        dispatch!({ type: Request.GET_POSTS, payload: post });
      }
    };

    fetchPost();
  }, [dispatch, id, user]); // eslint-disable-line

  return (
    <>
      <CreatePostButton />
      <div className="post">
        {posts &&
          posts.length > 0 &&
          posts.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
    </>
  );
}

export default Post;
