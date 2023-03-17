import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

type Method = "POST" | "PUT" | "DELETE";

export const useFetch = () => {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, seIsPending] = useState(false);
  const { user } = useAuthContext();

  const get = async (url: string) => {
    seIsPending(true);
    setError(null);
    const response = await fetch(`${process.env.REACT_APP_API_URI}${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearers ${user?.token}`,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (response.ok) {
      seIsPending(false);
      return json;
    } else {
      setError(json.error.message);
      console.log(json);
      setTimeout(() => setError(null), 3500);
      seIsPending(false);
    }
  };

  const modify = async (url: string, method: Method, body: {}) => {
    seIsPending(true);
    setError(null);
    const response = await fetch(`${process.env.REACT_APP_API_URI}${url}`, {
      method,
      headers: {
        Authorization: `Bearers ${user?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...body }),
    });
    const json = await response.json();
    if (response.ok) {
      seIsPending(false);
      return json;
    } else {
      setError(json.error.message);
      setTimeout(() => setError(null), 3500);
      seIsPending(false);
    }
  };

  const destroy = async (url: string, body?: {}) => {
    seIsPending(true);
    setError(null);
    const response = await fetch(`${process.env.REACT_APP_API_URI}${url}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearers ${user?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...body }),
    });
    const json = await response.json();
    if (response.ok) {
      seIsPending(false);
      return json;
    } else {
      setError(json.error.message);
      setTimeout(() => setError(null), 3500);
      seIsPending(false);
    }
  }

  return { error, isPending, success, setSuccess, get, modify, destroy };
};
