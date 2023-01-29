import { Link } from "react-router-dom";
import { Input } from "reactstrap";
import Avatar from "../../assets/default-avatar.png";

export const CreatePostButton = () => {
  return (
    <div className="bg-white p-3 d-flex rounded border">
      <img src={Avatar} className="rounded-circle me-3" alt="" width="40" />
      <Link to="/post/create" className="w-100 text-decoration-none">
        <Input
          placeholder="Start a post"
          style={{ background: "var(--light-grey)" }}
        />
      </Link>
    </div>
  );
};
