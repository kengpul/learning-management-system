import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PostsContextProvider } from "./context/PostsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PostsContextProvider>
      <App />
    </PostsContextProvider>
  </React.StrictMode>
);
