import { useState } from "react";

export const useAuthenticate = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    setError(null);
    setIsPending(true);

    const response = await fetch(
      `${process.env.REACT_APP_API_URI}connect/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error.message);
    } else {
      localStorage.setItem("user", JSON.stringify(json));
    }

    setIsPending(false);
  };

  const signup = async (username, password, email, type) => {
    setError(null);
    setIsPending(true);

    const response = await fetch(
      `${process.env.REACT_APP_API_URI}connect/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email, type }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error.message);
    } else {
      localStorage.setItem("user", JSON.stringify(json));
    }

    setIsPending(false);
  };

  return { login, signup, isPending, error, setError };
};
