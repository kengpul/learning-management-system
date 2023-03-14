import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import IQuiz from "../../models/Quiz";

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
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const [searchQuizzes, setSearchQuizzes] = useState<IQuiz[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<null | string>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const getQuizzes = async () => {
      const response = await fetch(process.env.REACT_APP_API_URI + "quiz", {
        headers: {
          Authorization: `Bearers ${user!.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setQuizzes(json);
      }
    };

    if (user) getQuizzes();
  }, [user]);

  const handleSearch = async () => {
    const searchResults = [];
    for (let quiz of quizzes) {
      if (quiz.title.toLowerCase().includes(search.trim().toLowerCase())) {
        searchResults.push(quiz);
      } else {
        setError("No result");
      }
    }
    if (searchResults.length) setError(null);
    setSearchQuizzes(searchResults);
  };

  const handleDates = (content: string) => {
    const created = new Date(content);
    const days = new Date().getUTCDate() + created.getUTCDate() - 20;
    const hours = new Date().getHours() + new Date(content).getHours();
    const minutes = Math.round(
      (new Date().getTime() + new Date(content).getTime()) / 60000
    );

    if (days > 0) {
      return `${days}d`;
    } else if (hours > 0 && days < 1) {
      return `${hours}h`;
    } else if (minutes > 0 && hours < 1 && days < 1) {
      return `${minutes}m`;
    } else {
      return "now";
    }
  };

  return (
    <Col className="mt-3">
      <Row className="d-flex justify-content-between flex-column-reverse flex-md-row">
        <Col md="6">
          <Input
            placeholder="Search quiz name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUpCapture={handleSearch}
          />
        </Col>
        <Col md="2">
          {user?.type === "Teacher" && (
            <div className="d-md-flex justify-content-end gap-2">
              <Link to="/feed/create">
                <Button size="sm" className="main-btn w-100" data-cy="assign">
                  Assign
                </Button>
              </Link>
              <Link to="/quiz/create">
                <Button
                  size="sm"
                  className="main-btn my-md-0 my-3 w-100"
                  data-cy="toggle-create"
                >
                  Create
                </Button>
              </Link>
            </div>
          )}
        </Col>
      </Row>

      {error && <h2 className="text-muted text-center mt-3">{error}</h2>}

      <Row>
        {searchQuizzes.length > 0 &&
          searchQuizzes.map((quiz) => (
            <Col md="4" className="mt-3 room-card" key={quiz._id}>
              <Card>
                <Link
                  to={`/quiz/${quiz._id}`}
                  className="text-dark d-flex align-items-start"
                >
                  <CardBody>
                    <CardTitle>{quiz.title}</CardTitle>
                    <CardSubtitle className="text-muted">
                      {handleDates(quiz.due)}
                    </CardSubtitle>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
      </Row>

      <Row>
        {quizzes.length > 0 &&
          searchQuizzes.length === 0 &&
          !error &&
          quizzes.map((quiz) => (
            <Col md="4" className="mt-3 room-card" key={quiz._id}>
              <Card>
                <Link
                  to={`/quiz/${quiz._id}`}
                  className="text-dark d-flex align-items-start"
                >
                  <CardBody data-cy="quiz-card">
                    <CardTitle>{quiz.title}</CardTitle>
                    <CardSubtitle className="text-muted">
                      {handleDates(quiz.due)}
                    </CardSubtitle>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
      </Row>
    </Col>
  );
}

export default Quizzes;
