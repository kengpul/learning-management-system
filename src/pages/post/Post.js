import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { usePostsContext } from "../../hooks/usePostsContext";

import { SideNavigationBar } from "../../components/Navbar/SideNavigationBar";
import { BottomNavigationBar } from "../../components/Navbar/BottomNavigation";
import { PostCard } from "../../components/Card/PostCard";
import { ListCard } from "../../components/Card/ListCard";
import { CreatePostButton } from "../../components/Card/CreatePostButton";
import { Create } from "./Create";
import { Error } from "../Error/Error";
import { Edit } from "./Edit";

import { Container, Row, Col, Spinner } from "reactstrap";
import "./post.css";

export const Post = () => {
  const [pending, setPending] = useState(false);
  const { posts, dispatch } = usePostsContext();

  useEffect(() => {
    const fetchPost = async () => {
      setPending(true);
      const response = await fetch(process.env.REACT_APP_API_URI + "post");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "GET_POSTS", payload: json });
      }
      setPending(false);
    };

    fetchPost();
  }, [dispatch]);

  return (
    <Container fluid className="post">
      <Row className="mt-2">
        <Col lg="2">
          <SideNavigationBar />
        </Col>

        <Routes>
          <Route
            path="/post"
            element={
              <>
                <Col className="d-lg-flex gap-lg-3 justify-content-lg-center ">
                  <Col lg="7">
                    <CreatePostButton />
                    {pending && (
                      <div className="text-center text-muted mt-5">
                        <Spinner />
                        <p className="mt-1">Loading posts...</p>
                      </div>
                    )}
                    {posts &&
                      posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                      ))}
                  </Col>

                  <Col lg="3">
                    <ListCard title={"Quizes"} />
                    <ListCard title={"Classes"} />
                    <ListCard title={"Groups"} />
                  </Col>
                </Col>
              </>
            }
          />
          <Route path="/post/create" element={<Create />} />
          <Route path="/post/:id/edit" element={<Edit />} />
          <Route path="*" element={<Error />} />
        </Routes>

        <BottomNavigationBar />
      </Row>
    </Container>
  );
};
