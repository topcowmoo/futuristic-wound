import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Client Side Imports
import App from "./App.jsx";
import "./index.css";

// Page Imports
import Home from "./pages/Home.jsx";
import Adventure from "./pages/Adventure.jsx";
import Dungeon from "./pages/Dungeon.jsx";
import Shop from "./pages/Shop.jsx";
import Login from "./pages/Login.jsx";
import Error from "./pages/Error.jsx";
import Signup from "./pages/Signup.jsx";
import Closet from "./pages/Closet.jsx"
import Starter from "./pages/Starter.jsx";

// Page Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "Home",
        element: <Home />,
      },
      {
        path: "Closet",
        element: <Closet />,
      },
      {
        path: "Adventure",
        element: <Adventure />,
      },
      {
        path: "Dungeon",
        element: <Dungeon />,
      },
      {
        path: "Shop",
        element: <Shop />,
      },
      {
        path: "Signup",
        element: <Signup />,
      },
      {
        path: "Starter",
        element: <Starter />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
