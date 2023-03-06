import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Input,
  Row,
} from "reactstrap";

function Quizzes() {
  return (
    <Col className="mt-3">
      <Row className="d-flex justify-content-between flex-column-reverse flex-md-row">
        <Col md="6">
          <Input placeholder="Search quiz name" />
        </Col>
        <Col md="2">
          <Link to="/quiz/create">
            <Button className="main-btn w-100 mb-3">Create</Button>
          </Link>
        </Col>
      </Row>

      <Row>
        <Col md="4" className="mt-3 room-card">
          <Card>
            <Link to="" className="text-dark d-flex align-items-start">
              <CardBody>
                <CardTitle>Quiz title</CardTitle>
                <CardSubtitle className="text-muted">Subtitle</CardSubtitle>
              </CardBody>
            </Link>
          </Card>
        </Col>
      </Row>
    </Col>
  );
}

export default Quizzes;
