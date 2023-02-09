import { Link } from "react-router-dom";

import { Button, Col } from "reactstrap";

export const Error = () => {
  return (
    <Col className="text-center my-auto">
      <h1 className="display-1 mb-3">Page not found</h1>
      <Link to="/post">
        <Button className="main-btn btn-lg">Go back to Home</Button>
      </Link>
    </Col>
  );
};
