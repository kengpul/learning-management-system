import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { usePostsContext } from "../../hooks/usePostsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

import CreatePostButton from "../../components/Card/CreatePostButton";
import PostCard from "../../components/Card/PostCard";

function Post() {
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
        process.env.REACT_APP_API_URI + "room/" + id,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearers ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "GET_POSTS", payload: json });
      }
    };

    fetchPost();
  }, [dispatch, id, user]);

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
