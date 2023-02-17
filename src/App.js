import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import { LandingNavigationBar } from "./components/Navbar/LandingNavigationBar";
import { Home } from "./pages/Home";
import { Connect } from "./pages/connect/Connect";
import { Post } from "./pages/post/Post";
import { NavigationBar } from "./components/Navbar/NavigationBar";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { user, authReady } = useAuthContext();

  return (
    <div className="App">
      {authReady && (
        <BrowserRouter>
          {user ? <NavigationBar /> : <LandingNavigationBar />}
          <Routes>
            <Route
              path="/"
              element={!user ? <Home /> : <Navigate to="/post" />}
            />
            <Route
              path="/connect"
              element={!user ? <Connect /> : <Navigate to="/post" />}
            />
            <Route
              path="/*"
              element={user ? <Post /> : <Navigate to="/connect" />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
