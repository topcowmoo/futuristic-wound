// Import Outlet
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Import ApolloProvider
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { useEffect, useState } from "react";

const httpLink = createHttpLink({
  uri: "/graphql",
});

// Auth Token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const location = useLocation();
  console.log(location);
  const [currentPage, setCurrentPage] = useState("");

  const excludePages = ["login", "signup", ""];

  useEffect(() => {
    const path = location.pathname;
    console.log(path);
    getPageNameFromPath(path);
    console.log(currentPage);
  });

  const getPageNameFromPath = (path) => {
    const pathParts = path.slice(1).split("/");
    console.log(pathParts);
    const pageName = pathParts[pathParts.length - 1];

    // console.log(pageName.toLowerCase());
    // console.log(currentPage);
    setCurrentPage(pageName.toLowerCase());
  };

  return (
    <>
      <ApolloProvider client={client}>
        {!excludePages.includes(currentPage) && currentPage && (
          <Header currentPage={currentPage} />
        )}
        <main>
          <Outlet />
        </main>
        <Footer currentPage={currentPage} />
      </ApolloProvider>
    </>
  );
}

export default App;
