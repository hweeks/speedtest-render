import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";

const home_node = document.getElementById("home");

const WrappedHome = () => (
  <Provider store={store}>
    <div>sup</div>
  </Provider>
);

window.onload = () => {
  ReactDOM.render(<WrappedHome />, home_node);
};
