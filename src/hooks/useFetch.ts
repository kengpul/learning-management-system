import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostsContext } from "./usePostsContext";
import { useAuthContext } from "./useAuthContext";
import { ActionType } from "../models/Post";

interface Options {
  value: string;
  label: string;
}

export const useFetch = () => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();

  const create = async (
    url: string,
    method: string,
    type: ActionType,
    content: string,
    rooms?: Options[]
  ) => {
    if (!user) return;
    if (content === "<p><br></p>") content = "";
    setPending(true);
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearers ${user.token}`,
      },
      body: JSON.stringify({ content, rooms }),
    });

    const json = await response.json();

    if (response.ok) {
      dispatch!({ type, payload: json });
      navigate("/feed/");
    } else {
      setError(json.error.message);
      setTimeout(() => setError(null), 4500);
    }

    setPending(false);
  };

  const destroy = async (url: string, method: string, type: ActionType) => {
    if (!user) return;
    setPending(true);
    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearers ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch!({ type, payload: json });
    } else {
      setError(json.error.message);
      setTimeout(() => setError(null), 4500);
    }
    setPending(false);
  };

  return { pending, error, create, destroy };
};
