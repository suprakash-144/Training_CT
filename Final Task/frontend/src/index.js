import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "antd/dist/reset.css";
import { AuthProvider } from "./context/AuthProvider";

import { PrimeReactProvider } from "primereact/api";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </PrimeReactProvider>
  </React.StrictMode>
);
