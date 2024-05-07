// Importing the jsonwebtoken library for JWT functionality
const jwt = require("jsonwebtoken");
// Importing the GraphQLError class from the graphql library
const { GraphQLError } = require("graphql");

// Secret key used for signing JWT tokens
const secret = "mysecretsshhhhh";

// Expiration time for JWT tokens (2 hours)
const expiration = "2h";

// Exporting GraphQL error and authentication extensions for unauthenticated requests
module.exports = {
  // Creating a new instance of GraphQLError with a message for authentication errors
  AuthenticationError: new GraphQLError("Authentication Error"),
  // Extensions to be added to the GraphQL error for indicating unauthenticated requests
  extensions: {
    code: "UNAUTHENTICATED",
  },

  // Middleware function for token authentication
  authMiddleware: function ({ req }) {
    // Extracting token from request headers, body, or query parameters

    let token = req.body.token || req.query.token || req.headers.authorization;

    // If token is provided in the Authorization header, extract it
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    // If token is not provided, return the request object unchanged
    if (!token) {
      return req;
    }

    // Verify and decode the JWT token
    try {
      // Verifying the token using the secret key and setting the maxAge to expiration time
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      // Set the decoded user data on the request object

      req.user = data;
    } catch (error) {
      // Log error message if token verification fails
      console.log("Invalid token", error);
    }

    // Return the request object with user data (if authenticated)
    return req;
  },

  // Function for signing JWT tokens with user data
  signToken: function ({ name, email, _id }) {
    // Creating a payload object with user information
    const payload = { name, email, _id };
    // Sign the payload with the secret key and set expiration time
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
