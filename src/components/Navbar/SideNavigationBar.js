import { NavLink } from "react-router-dom";

import avatar from "../../assets/default-avatar.png";
import "./navigation.css";

export const SideNavigationBar = () => {
  return (
    <div className="d-none d-lg-block side-nav text-white rounded-end h-100">
      <div className="profile mb-5 text-center">
        <img
          src={avatar}
          className="img-fluid mt-3 rounded-circle"
          width="80"
          alt=""
        />
        <h5 className="mt-3">Paul</h5>
        <NavLink to="/profile" className="link-light text-decoration-none">
          View Profile
        </NavLink>
      </div>
      <div className="d-grid gap-2">
        <NavLink
          to="/post"
          className="navigation-btn ps-1 py-2 mx-2 rounded fw-bold"
        >
          <i className="fas fa-house-user me-1"></i>DASHBOARD
        </NavLink>
        <NavLink
          to="/class"
          className="navigation-btn ps-1 py-2 mx-2 rounded fw-bold"
        >
          <i className="fas fa-users me-1"></i>MY CLASS
        </NavLink>
        <NavLink
          to="/group"
          className="navigation-btn ps-1 py-2 mx-2 rounded fw-bold"
        >
          <i className="fas fa-users me-1"></i>MY GROUP
        </NavLink>
        <NavLink
          to="/quiz"
          className="navigation-btn ps-1 py-2 mx-2 rounded fw-bold"
        >
          <i className="fas fa-book-open me-1"></i>MY QUIZ
        </NavLink>
        <NavLink
          to="/chats"
          className="navigation-btn ps-1 py-2 mx-2 rounded fw-bold"
        >
          <i className="fas fa-comment me-1"></i>CHATS
        </NavLink>
      </div>
    </div>
  );
};
