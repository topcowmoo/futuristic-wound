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
  const token = localStorage.getItem("id_token");
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
  const [currentPages, setCurrentPages] = useState("home");
  const excludePages = ["login", "signup", ""];

  useEffect(() => {
    const path = location.pathname;
    console.log({ path });
    console.log({ location });
    getPageNameFromPath(path);
  }, [location]);

  const getPageNameFromPath = (path) => {
    const pathParts = path.slice(1).split("/");
    const pageName = pathParts[pathParts.length - 1];
    console.log({ pageName });
    setCurrentPages(pageName.toLowerCase());
  };

  return (
    <>
      <ApolloProvider client={client}>
        {!excludePages.includes(currentPages) && (
          <Header currentPageProp={currentPages} />
        )}
        <main>
          <Outlet />
        </main>
        {!excludePages.includes(currentPages) && (
          <Footer currentPage={currentPages} />
        )}
      </ApolloProvider>
    </>
  );
}

export default App;
