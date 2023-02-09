import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostsContext } from "./usePostsContext";

export const useFetch = () => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = usePostsContext();

  const create = async (url, method, type, content) => {
    if (content === "<p><br></p>") content = "";
    setPending(true);
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type, payload: json });
      navigate("/post");
    } else {
      setError(json.error.message);
      setTimeout(() => setError(null), "4500");
    }

    setPending(false);
  };

  const destroy = async (url, method, type) => {
    setPending(true);
    const response = await fetch(url, { method });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type, payload: json });
    } else {
      setError(json.error.message);
      setTimeout(() => setError(null), "4500");
    }
    setPending(false);
  };

  return { pending, error, create, destroy };
};
