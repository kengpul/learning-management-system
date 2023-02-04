import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RichTextForm } from "../../components/form/RichTextForm";
import { usePostsContext } from "../../hooks/usePostsContext";

export const Create = () => {
  const [form, setForm] = useState(null);
  const navigate = useNavigate();
  const {dispatch} = usePostsContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(process.env.REACT_APP_API_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: form }),
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({type: 'CREATE_POST', payload: json})
      navigate("/post");
    }
  };

  return (
    <RichTextForm handleSubmit={handleSubmit} form={form} setForm={setForm} />
  );
};
