import ReactDOM from "react-dom/client"; // Importing ReactDOM for client-side rendering
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Importing routing components from react-router-dom

// Client Side Imports
import App from "./App.jsx"; // Importing main App component
import "./index.css"; // Importing CSS styles

// Page Imports
import Home from "./pages/Home.jsx"; // Importing Home page component
import Adventure from "./pages/Adventure.jsx"; // Importing Adventure page component
import Dungeon from "./pages/Dungeon.jsx"; // Importing Dungeon page component
import Shop from "./pages/Shop.jsx"; // Importing Shop page component
import Login from "./pages/Login.jsx"; // Importing Login page component
import Error from "./pages/Error.jsx"; // Importing Error page component
import Signup from "./pages/Signup.jsx"; // Importing Signup page component
import Closet from "./pages/Closet.jsx"; // Importing Closet page component
import Starter from "./pages/Starter.jsx"; // Importing Starter page component
import Success from "./pages/Success.jsx"; // Importing Success page component

// Page Router
const router = createBrowserRouter([
  // Creating a browser router with specified routes
  {
    path: "/", // Root path
    element: <App />, // Main App component
    errorElement: <Error />, // Error page component
    children: [
      // Child routes
      {
        index: true, // Index route
        element: <Login />, // Login page component
      },
      {
        path: "Home", // Home page path
        element: <Home />, // Home page component
      },
      {
        path: "Closet", // Closet page path
        element: <Closet />, // Closet page component
      },
      {
        path: "Adventure", // Adventure page path
        element: <Adventure />, // Adventure page component
      },
      {
        path: "Dungeon", // Dungeon page path
        element: <Dungeon />, // Dungeon page component
      },
      {
        path: "Shop", // Shop page path
        element: <Shop />, // Shop page component
      },
      {
        path: "Signup", // Signup page path
        element: <Signup />, // Signup page component
      },
      {
        path: "Starter", // Starter page path
        element: <Starter />, // Starter page component
      },
      {
        path: "success", // Success page path
        element: <Success />, // Success page component
      },
    ],
  },
]);

// Rendering the router using ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} /> // Providing the router to the RouterProvider
);
