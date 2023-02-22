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

import { Col, Container, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Room from "./pages/room/Room";
import Rooms from "./pages/room/Rooms";

function App() {
  const { user, authReady } = useAuthContext();

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
              <Route
                path="/"
                element={!user ? <Home /> : <Navigate to="/feed/" />}
              />
              <Route
                path="/connect"
                element={!user ? <Connect /> : <Navigate to="/feed/" />}
              />

              <Route
                path="/feed/"
                element={user ? <Feed /> : <Navigate to="/connect" />}
              />
              <Route
                path="/feed/create"
                element={user ? <Create /> : <Navigate to="/connect" />}
              />
              <Route
                path="/post/:id/edit"
                element={user ? <Edit /> : <Navigate to="/connect" />}
              />

              <Route
                path="/class"
                element={user ? <Rooms /> : <Navigate to="/connect" />}
              />
              <Route
                path="/class/c"
                element={user ? <Room /> : <Navigate to="/connect" />}
              />
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        )}
      </Row>
    </Container>
  );
}

export default App;
