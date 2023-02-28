import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useAuthContext } from "../../hooks/useAuthContext";

import ToastCard from "../../components/Card/ToastCard";
import RichTextForm from "../../components/form/RichTextForm";
import { Request } from "../../models/Post";

export default function Edit() {
  const [form, setForm] = useState("");
  const { id } = useParams();
  const { create, pending, error } = useFetch();
  const { user } = useAuthContext();

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_API_URI}post/${id}`,
          {
            headers: { Authorization: `Bearers ${user?.token}` },
          }
        );
        const post = await response.json();
        if (response.ok) {
          setForm(post.content);
        }
      };
      if (user) {
        fetchPost();
      }
    }
  }, [id, user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URI}post/${id}`;
    await create(url, "PUT", Request.EDIT_POST, form);
  };

  return (
    <>
      {error && <ToastCard message={error} color={"danger"} />}
      <RichTextForm
        handleSubmit={handleSubmit}
        pending={pending}
        form={form}
        setForm={setForm}
      />
    </>
  );
}
