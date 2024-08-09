import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Deck from "./pages/Deck.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <App />
      </>
    ),
  },
  {
    path: "/decks/:deckId",
    element: (
      <>
        <Header />
        <Deck />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
