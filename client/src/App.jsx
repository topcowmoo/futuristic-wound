import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Import Outlet
import { Outlet } from 'react-router-dom'

// Import ApolloProvider
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Auth Token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    },
  };
});

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  
  function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </ApolloProvider>
    </>
  );
  }

export default App
