const express = require('express');
const path = require('path');
const db = require('./config/connection'); // Importing database connection setup

const { expressMiddleware } = require('@apollo/server/express4'); // Importing Apollo Server Express middleware
const { ApolloServer } = require('@apollo/server'); // Importing Apollo Server
const { authMiddleware } = require('./utils/auth'); // Importing custom authentication middleware
const { typeDefs, resolvers } = require('./schemas'); // Importing GraphQL schema and resolvers

const app = express(); // Creating an Express application
const PORT = process.env.PORT || 3001; // Setting port number

const server = new ApolloServer({ // Creating Apollo Server instance
  typeDefs, // Passing GraphQL type definitions
  resolvers, // Passing GraphQL resolvers
});

const startApolloServer = async () => { // Function to start Apollo Server
  await server.start(); // Starting Apollo Server

  // Middleware for parsing request bodies
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Applying Apollo Server middleware to the '/graphql' endpoint
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware // Passing custom authentication middleware to the Apollo context
  }));

  // Serving static files and handling client-side routing in production environment
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Listening for database connection 'open' event and starting Express server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
