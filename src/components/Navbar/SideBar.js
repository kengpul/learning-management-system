import { Col } from "reactstrap";
import avatar from "../../assets/default-avatar.png";
import "./sidebar.css";

export const SideBar = () => {
  return (
    <Col lg="2" className="d-none d-lg-block side-nav text-white rounded h-100 position-sticky top-0">
      <div className="profile mt-3 mb-5 text-center">
        <img src={avatar} className="img-fluid" width="80" alt="" />
        <h5 className="mt-3">Paul</h5>
        <a href="#" className="link-light">
          View Profile
        </a>
      </div>
      <div className="d-grid gap-2 pb-5">
        <a href="#" className="navigation-btn ps-2 py-2 fw-bold text-start">
          <i className="fas fa-house-user me-2"></i>DASHBOARD
        </a>
        <a
          href="#"
          className="navigation-btn ps-2 py-2 fw-bold text-start"
        >
          <i className="fas fa-users me-2"></i>MY CLASS
        </a>
        <a
          href="#"
          className="navigation-btn ps-2 py-2 fw-bold text-start"
        >
          <i className="fas fa-users me-2"></i>MY GROUP
        </a>
        <a href="#" className="navigation-btn ps-2 py-2 fw-bold text-start">
          <i className="fas fa-book-open me-2"></i>MY QUIZ
        </a>
        <a href="#" className="navigation-btn ps-2 py-2 fw-bold text-start">
          <i className="fas fa-comment me-2"></i>CHATS
        </a>
      </div>
    </Col>
  );
};
