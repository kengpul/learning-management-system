import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RichTextForm } from "../../components/form/RichTextForm";
import { usePostsContext } from "../../hooks/usePostsContext";

export const Edit = () => {
  const [form, setForm] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { dispatch } = usePostsContext();

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URI}${id}`);
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

    const response = await fetch(`${process.env.REACT_APP_API_URI}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: form }),
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "EDIT_POST", payload: json });
      navigate("/post");
    }
  };

  return (
    <RichTextForm handleSubmit={handleSubmit} form={form} setForm={setForm} />
  );
};