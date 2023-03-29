import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { NavLink, Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./navigation.css";

interface JWTDecode {
  userID: string;
  ati: number;
  exp: number;
}

function SideNavigationBar() {
  const [profile, setProfile] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      const decode = jwtDecode(user!.token) as JWTDecode;
      setProfile(decode.userID);
    }
  }, [user]);

  return (
    <div className="d-none d-lg-block side-nav text-white rounded-end h-100">
      <div className="profile mb-5 text-center">
        <img
          src="https://res.cloudinary.com/dsjrdrewd/image/upload/v1676885960/learning-management-system/assets/default-avatar_hk6j0v.png"
          className="img-fluid mt-3 rounded-circle"
          width="80"
          alt=""
        />
        <h5 className="mt-3">{user?.fullname}</h5>
        <Link
          to={`/profile/${profile}`}
          className="link-light text-decoration-none"
        >
          View Profile
        </Link>
      </div>
      <div className="d-grid gap-2">
        <NavLink
          to="/feed/"
          data-cy="feed"
          className="navigation-btn ps-1 py-2 mx-2 rounded fw-bold"
        >
          <i className="fas fa-house-user me-1"></i>DASHBOARD
        </NavLink>
        <NavLink
          to="/room/"
          data-cy="room"
          className="navigation-btn ps-1 py-2 mx-2 rounded fw-bold"
        >
          <i className="fas fa-users me-1"></i>ROOM
        </NavLink>
        <NavLink
          to="/quiz/"
          data-cy="quiz"
          className="navigation-btn ps-1 py-2 mx-2 rounded fw-bold"
        >
          <i className="fas fa-book-open me-1"></i>QUIZ
        </NavLink>
        <NavLink
          to="/chats/"
          data-cy="chat"
          className="navigation-btn ps-1 py-2 mx-2 rounded fw-bold"
        >
          <i className="fas fa-comment me-1"></i>CHAT
        </NavLink>
      </div>
    </div>
  );
}

export default SideNavigationBar;
