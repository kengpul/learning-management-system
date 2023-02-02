import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RichTextForm } from "../../components/form/RichTextForm";

export const Create = () => {
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(process.env.REACT_APP_API_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: form }),
    });

    if (response.ok) {
      navigate("/post");
    }
  };

  return (
    <RichTextForm handleSubmit={handleSubmit} form={form} setForm={setForm} />
  );
};
