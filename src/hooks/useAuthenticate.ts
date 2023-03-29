import { useState } from "react";
import { AccountType } from "../models/User";

export const useAuthenticate = () => {
  const [isPending, setIsPending] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    setError(null);
    setIsRegistered(false);
    setIsPending(true);

    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/connect/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error.message);
      setIsPending(false);
    } else {
      setIsPending(false);
      localStorage.setItem("user", JSON.stringify(json));
      return json;
    }
  };

  const signup = async (
    fullname: string,
    username: string,
    password: string,
    email: string,
    type: AccountType
  ) => {
    setError(null);
    setIsPending(true);

    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/connect/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, username, password, email, type }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error.message);
      setIsPending(false);
    } else {
      setIsRegistered(true);
      setIsPending(false);
      return json;
    }
  };

  return { login, signup, isRegistered, isPending, error, setError };
};
