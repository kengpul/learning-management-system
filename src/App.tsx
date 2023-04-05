import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import LandingNavigationBar from "./components/Navbar/LandingNavigationBar";
import Home from "./pages/Home";
import Connect from "./pages/connect/Connect";
import Feed from "./pages/feed/Feed";
import NavigationBar from "./components/Navbar/NavigationBar";
import Create from "./pages/feed/Create";
import Edit from "./pages/feed/Edit";
import Error from "./pages/Error/Error";
import SideNavigationBar from "./components/Navbar/SideNavigationBar";
import BottomNavigationBar from "./components/Navbar/BottomNavigation";
import Room from "./pages/room/Room";
import Rooms from "./pages/room/Rooms";
import Quiz from "./pages/quiz/Quiz";
import Quizzes from "./pages/quiz/Quizzes";
import QuizCreate from "./pages/quiz/Create";
import QuizEdit from "./pages/quiz/Edit";
import Profile from "./pages/profile/Profile";
import { Col, Container, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Chats from "./pages/chat/Chats";
import Chat from "./pages/chat/Chat";

function App() {
  const { user, authReady } = useAuthContext();

  const requireAuth = (element: JSX.Element) => {
    return user ? element : <Navigate to="/connect/" />;
  };
  const optionalAuth = (element: JSX.Element) => {
    return !user ? element : <Navigate to="/feed/" />;
  };

  return (
    <Container fluid>
      <Row>
        {authReady && (
          <BrowserRouter>
            {user ? <NavigationBar /> : <LandingNavigationBar />}
            {user && (
              <>
                <Col lg="2" className="p-0 mt-3">
                  <SideNavigationBar />
                </Col>
                <BottomNavigationBar />
              </>
            )}

            <Routes>
              <Route path="/" element={optionalAuth(<Home />)} />
              <Route path="/connect" element={optionalAuth(<Connect />)} />

              <Route path="/feed/" element={requireAuth(<Feed />)} />
              <Route path="/feed/create" element={requireAuth(<Create />)} />
              <Route path="/post/:id/edit" element={requireAuth(<Edit />)} />

              <Route path="/room" element={requireAuth(<Rooms />)} />
              <Route path="/room/:id" element={requireAuth(<Room />)} />

              <Route path="/quiz/" element={requireAuth(<Quizzes />)} />
              <Route
                path="/quiz/create"
                element={requireAuth(<QuizCreate />)}
              />
              <Route
                path="/quiz/:id"
                element={requireAuth(
                  user?.type === "Teacher" ? <QuizEdit /> : <Quiz />
                )}
              />

              <Route path="/profile/:id" element={requireAuth(<Profile />)} />

              <Route path="/chats" element={requireAuth(<Chats />)} />
              <Route path="/chats/:id" element={requireAuth(<Chat />)} />

              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        )}
      </Row>
    </Container>
  );
}

export default App;
