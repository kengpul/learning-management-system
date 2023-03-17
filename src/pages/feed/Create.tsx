import React, { FormEvent, useState } from "react";
import { Request } from "../../models/Post";
import { useFetch } from "../../hooks/useFetch";
import { usePostsContext } from "../../hooks/usePostsContext";
import { useNavigate } from "react-router-dom";
import { Method } from "../../models/enums";
import ToastCard from "../../components/Card/ToastCard";
import RichTextForm from "../../components/form/RichTextForm";

interface Options {
  value: string;
  label: string;
}

export default function Create() {
  const [form, setForm] = useState("");
  const [rooms, setRooms] = useState<Options[]>([]);
  const { dispatch } = usePostsContext();
  const navigate = useNavigate();
  const { modify, error, isPending } = useFetch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const body = {
      content: form,
      rooms,
    };
    const feedPost = await modify("/post", Method.POST, body);
    if (!feedPost.error) {
      dispatch!({ type: Request.CREATE_POST, payload: feedPost });
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
        setRooms={setRooms}
      />
    </>
  );
}
