import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

import { ToastCard } from "../../components/Card/ToastCard";
import { RichTextForm } from "../../components/form/RichTextForm";

export const Edit = () => {
  const [form, setForm] = useState("");
  const { id } = useParams();
  const { create, pending, error } = useFetch();

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_API_URI}post/${id}`
        );
        const post = await response.json();
        if (response.ok) {
          setForm(post.content);
        }
      };
      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URI}post/${id}`;
    await create(url, "PUT", "EDIT_POST", form);
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
};
