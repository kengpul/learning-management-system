import { Routes, Route, BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { LandingNavigationBar } from "./components/Navbar/LandingNavigationBar";
import { Home } from "./pages/Home";
import { Connect } from "./pages/connect/Connect";
import { Post } from "./pages/post/Post";
import { NavigationBar } from "./components/Navbar/NavigationBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <LandingNavigationBar /> */}
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/*" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
