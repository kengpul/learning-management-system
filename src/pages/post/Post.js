import { Container, Row, Col } from "reactstrap";
import "./post.css";

import { SideNavigationBar } from "../../components/Navbar/SideNavigationBar";
import { BottomNavigationBar } from "../../components/Navbar/BottomNavigation";
import { PostInput } from "../../components/Form/PostInput";
import { PostCard } from "../../components/Card/PostCard";

export const Post = () => {
  return (
    <Container fluid className="post">
      <Row className="mt-2">
        <Col lg="2">
          <SideNavigationBar />
        </Col>

        <Col lg="6">
          <PostInput />
          <PostCard />
        </Col>

        <BottomNavigationBar />
      </Row>
    </Container>
  );
};