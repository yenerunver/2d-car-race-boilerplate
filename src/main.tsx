import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./store";

import App from "./App";
import DevTools from "./DevTools";

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <App />
      <DevTools />
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);
