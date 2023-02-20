import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostsContext } from "./usePostsContext";
import { useAuthContext } from "./useAuthContext";

export const useFetch = () => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();

  const create = async (url, method, type, content) => {
    if (!user) return;
    if (content === "<p><br></p>") content = "";
    setPending(true);
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearers ${user.token}`,
      },
      body: JSON.stringify({ content }),
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type, payload: json });
      navigate("/feed/");
    } else {
      setError(json.error.message);
      setTimeout(() => setError(null), "4500");
    }

    setPending(false);
  };

  const destroy = async (url, method, type) => {
    if (!user) return;
    setPending(true);
    const response = await fetch(url, {
      method,
      headers: {
        "Authorization": `Bearers ${user.token}`,
      },
    });

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
