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
          <Link to="/quiz/create">
            <Button className="main-btn w-100">Create</Button>
          </Link>
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
                      {quiz.author.username}
                    </CardSubtitle>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
      </Row>

      <Row>
        {quizzes.length > 0 &&
          searchQuizzes.length === 0 && !error &&
          quizzes.map((quiz) => (
            <Col md="4" className="mt-3 room-card" key={quiz._id}>
              <Card>
                <Link
                  to={`/quiz/${quiz._id}`}
                  className="text-dark d-flex align-items-start"
                >
                  <CardBody>
                    <CardTitle>{quiz.title}</CardTitle>
                    <CardSubtitle className="text-muted">
                      {quiz.author.username}
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
