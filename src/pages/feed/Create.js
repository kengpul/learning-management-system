import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";

import ToastCard from "../../components/Card/ToastCard";
import RichTextForm from "../../components/form/RichTextForm";

export default function Create() {
  const [form, setForm] = useState("");
  const [rooms, setRooms] = useState([]);
  const { create, pending, error } = useFetch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await create(
      process.env.REACT_APP_API_URI + "post",
      "POST",
      "CREATE_POST",
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
