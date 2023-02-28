import React, { FormEvent, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

import ToastCard from "../../components/Card/ToastCard";
import RichTextForm from "../../components/form/RichTextForm";
import { Request } from "../../models/Post";

interface Options {
  value: string;
  label: string;
}

export default function Create() {
  const [form, setForm] = useState("");
  const [rooms, setRooms] = useState<Options[]>([]);
  const { create, pending, error } = useFetch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await create(
      process.env.REACT_APP_API_URI + "post",
      "POST",
      Request.CREATE_POST,
      form,
      rooms
    );
  };

  return (
    <>
      {error && <ToastCard message={error} color={"danger"} />}
      <RichTextForm
        handleSubmit={handleSubmit}
        pending={pending}
        form={form}
        setForm={setForm}
        setRooms={setRooms}
      />
    </>
  );
}
