// Import Outlet and useLocation hooks from react-router-dom for routing
import { Outlet, useLocation } from "react-router-dom";
// Import Header and Footer components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Import ApolloProvider and necessary Apollo Client dependencies
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useEffect, useState } from "react"; // Import useEffect and useState hooks from React

// Create an HTTP link for the Apollo Client
const httpLink = createHttpLink({
  uri: "/graphql", // GraphQL endpoint URI
});

// Set up authentication token for Apollo Client requests
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token"); // Get the authentication token from local storage
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "", // Add authorization header with token if available
    },
  };
});

// Create Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Concatenate authLink and httpLink for Apollo Client
  cache: new InMemoryCache(), // Initialize Apollo Client cache
});

// Conditionally render Header and Footer based on current page
function App() {
  const location = useLocation(); // Get current location from useLocation hook
  const [currentPage, setCurrentPage] = useState("home"); // State to track current page
  const excludePages = ["login", "signup", ""]; // Pages to exclude Header and Footer rendering

  useEffect(() => {
    const path = location.pathname; // Get current path from location
    getPageNameFromPath(path); // Extract page name from path
  }, [location]);

  // Function to extract page name from path
  const getPageNameFromPath = (path) => {
    const pathParts = path.slice(1).split("/"); // Split path into parts
    const pageName = pathParts[pathParts.length - 1]; // Get last part as page name
    setCurrentPage(pageName.toLowerCase()); // Set current page state
  };

  return (
    <>
      <ApolloProvider client={client}>
        {" "}
        {/* Provide Apollo Client to components */}
        {/* Conditionally render Header based on current page */}
        {!excludePages.includes(currentPage) && (
          <Header currentPageProp={currentPage} />
        )}
        <main>
          <Outlet /> {/* Outlet to render nested routes */}
        </main>
        {/* Conditionally render Footer based on current page */}
        {!excludePages.includes(currentPage) && (
          <Footer currentPage={currentPage} />
        )}
      </ApolloProvider>
    </>
  );
}

export default App; // Export App component
