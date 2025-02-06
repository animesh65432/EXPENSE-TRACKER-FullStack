import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./MainPage";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./stroe";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MainPage />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
