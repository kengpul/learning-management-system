import { Routes, Route, BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { NavigationBar } from "./components/Navbar/NavigationBar";
import { Home } from "./pages/Home";
import { Connect } from "./pages/connect/Connect";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connect" element={<Connect />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
