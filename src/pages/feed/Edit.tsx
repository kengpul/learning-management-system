import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFetch } from "../../hooks/useFetch";
import { Request } from "../../models/Post";
import { usePostsContext } from "../../hooks/usePostsContext";
import RichTextForm from "../../components/form/RichTextForm";
import { Method } from "../../models/enums";
import ToastCard from "../../components/Card/ToastCard";

export default function Edit() {
  const [form, setForm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const { user } = useAuthContext();
  const { get, modify, isPending, error } = useFetch();
  const navigate = useNavigate();
  const { dispatch } = usePostsContext();

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const post = await get(`/post/${id}`);
        if (!post.error) setForm(post.content);
      };
      if (user) {
        fetchPost();
        setIsEditing(true);
      }
    }
  }, [id, user]); // eslint-disable-line

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const editPost = await modify(`/post/${id}`, Method.PUT, { content: form });
    if (!editPost.error) {
      dispatch!({ type: Request.EDIT_POST, payload: editPost });
      navigate("/feed/");
    }
  };

  return (
    <>
      {error && <ToastCard message={error} color={"danger"} />}
      <RichTextForm
        handleSubmit={handleSubmit}
        pending={isPending}
        form={form}
        setForm={setForm}
        isEditing={isEditing}
      />
    </>
  );
}
