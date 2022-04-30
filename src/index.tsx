import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import { store } from "./store/store";
import { Provider } from "react-redux";

const rootContainer = document.getElementById("root");

if (rootContainer === null)
  throw new Error("Root container missing in index.html");

createRoot(rootContainer).render(
  <Provider store={store}>
    <App />
  </Provider>
);
