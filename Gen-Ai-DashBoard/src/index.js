import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";  // Import Provider
import store from "./redux/store";  // Import Redux store
import App from "./App";
import "./index.css"; // Ensure Tailwind CSS is imported

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>  
    <App />
  </Provider>
);
