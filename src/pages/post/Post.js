import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { SideNavigationBar } from "../../components/Navbar/SideNavigationBar";
import { BottomNavigationBar } from "../../components/Navbar/BottomNavigation";
import { PostCard } from "../../components/Card/PostCard";
import { ListCard } from "../../components/Card/ListCard";
import { CreatePostButton } from "../../components/Card/CreatePostButton";
import { Create } from "./Create";

import { Container, Row, Col } from "reactstrap";
import "./post.css";
import { Edit } from "./Edit";

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
          <Route path="/post/:id/edit" element={<Edit />} />
        </Routes>

        <BottomNavigationBar />
      </Row>
    </Container>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(process.env.REACT_APP_API_URI);
      const json = await response.json();

      if (response.ok) {
        setPosts(json);
      }
    };

    fetchPost();
  }, []);

  return (
    <>
      <Col className="d-lg-flex gap-lg-3 justify-content-lg-center ">
        <Col lg="7">
          <CreatePostButton />
          {posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
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
