import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const element = document.getElementById("root");
if (!element) {
  throw new Error("Failed to find the root element");
}

const root = ReactDOM.createRoot(element as HTMLElement);

root.render(<App />);
