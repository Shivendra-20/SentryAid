import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer position="top-right" autoClose={3000} />
  </StrictMode>
);
