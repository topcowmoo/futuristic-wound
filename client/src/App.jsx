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
  // Lines 44-59 in a nutshell operates as follows: 
  // When the user changes pages or navigates through the app, the current page is updated in the state.
  // We exclude the login, and sign up pages [this is to prevent the header and footer from rendering on signup and login]
  // We then extract the page that the user is on from the path and set it in the state.
  // We then pass the current page to the header and footer components to conditionally render them.
  // These comments are for anyone trying to figure out why the code from line 44-59 exists.
  const location = useLocation();
  const [currentPages, setCurrentPages] = useState("home");
  const excludePages = ["login", "signup", ""];

  useEffect(() => {
    const path = location.pathname;
    getPageNameFromPath(path);
  }, [location]);

  const getPageNameFromPath = (path) => {
    const pathParts = path.slice(1).split("/");
    const pageName = pathParts[pathParts.length - 1];
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
