import { Routes, Route } from "react-router-dom";

import { SideNavigationBar } from "../../components/Navbar/SideNavigationBar";
import { BottomNavigationBar } from "../../components/Navbar/BottomNavigation";
import { PostCard } from "../../components/Card/PostCard";
import { ListCard } from "../../components/Card/ListCard";
import { CreatePostButton } from "../../components/Card/CreatePostButton";
import { Create } from "./Create";

import { Container, Row, Col } from "reactstrap";
import "./post.css";

export const Post = () => {
  return (
    <Container fluid className="post">
      <Row className="mt-2">
        <Col lg="2">
          <SideNavigationBar />
        </Col>

       
          <Routes>
            <Route path="/post" element={<Feed />} />
            <Route path="/post/create" element={<Create />} />
          </Routes>
    

        <BottomNavigationBar />
      </Row>
    </Container>
  );
};

const Feed = () => {
  return (
    <>
     <Col className="d-flex gap-lg-3 justify-content-center">
      <Col lg="7">
        <CreatePostButton />
        <PostCard />
        <PostCard />
      </Col>

      <Col lg="3">
        <ListCard title={"Quizes"} />
        <ListCard title={"Classes"} />
        <ListCard title={"Groups"} />
      </Col>
      </Col>
    </>
  );
};
