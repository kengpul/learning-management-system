import { Container, Row, Col } from "reactstrap";
import "./post.css";

import { SideNavigationBar } from "../../components/Navbar/SideNavigationBar";
import { BottomNavigationBar } from "../../components/Navbar/BottomNavigation";
import { PostInput } from "../../components/Form/PostInput";
import { PostCard } from "../../components/Card/PostCard";
import { ListCard } from "../../components/Card/ListCard";

export const Post = () => {
  return (
    <Container fluid className="post">
      <Row className="mt-2">
        <Col lg="2">
          <SideNavigationBar />
        </Col>

        <Col className="d-flex gap-3 justify-content-center">
          <Col lg="7">
            <PostInput />
            <PostCard />
            <PostCard />
          </Col>

          <Col lg="3">
            <ListCard title={"Quizes"} />
            <ListCard title={"Classes"} />
            <ListCard title={"Groups"} />
          </Col>
        </Col>

        <BottomNavigationBar />
      </Row>
    </Container>
  );
};
