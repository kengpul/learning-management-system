import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Input } from "reactstrap";

function CreatePostButton() {
  const { user } = useAuthContext();
  return (
    <div className="bg-white p-3 d-flex rounded border">
      <img
      style={{width: "40px", height: "40px"}}
        src={
          user?.avatar
            ? user.avatar
            : "https://res.cloudinary.com/dsjrdrewd/image/upload/v1676885960/learning-management-system/assets/default-avatar_hk6j0v.png"
        }
        className="rounded-circle me-3"
        alt=""
        width="40"
      />
      <Link
        to="/feed/create"
        data-cy="create"
        className="w-100 text-decoration-none"
      >
        <Input
          placeholder="Start a post"
          style={{ background: "var(--light-grey)" }}
        />
      </Link>
    </div>
  );
}

export default CreatePostButton;
