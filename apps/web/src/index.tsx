import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AnimationPage, ContinuesVoicePage, HomePage } from "./pages";
import reportWebVitals from "./reportWebVitals";
import { ROUTE } from "./constants";
import "./index.css";

const router = createBrowserRouter([
  {
    path: ROUTE.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTE.ANIMATION,
    element: <AnimationPage />,
  },
  {
    path: ROUTE.CONTINUES_VOICE,
    element: <ContinuesVoicePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();