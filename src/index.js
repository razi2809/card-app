import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, HashRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./REDUX/bigPie";
import { getToken } from "./service/tokenservice";
const root = ReactDOM.createRoot(document.getElementById("root"));
axios.defaults.baseURL = "http://164.90.179.59";
axios.interceptors.request.use((config) => {
  const tokenoOBj = getToken();
  if (tokenoOBj) {
    config.headers["Authorization"] = `Bearer ${tokenoOBj.token}`;
  }
  return config;
});
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter basename="/card-app">
      <App />
    </BrowserRouter>
  </Provider>
  /* </React.StrictMode>  */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
