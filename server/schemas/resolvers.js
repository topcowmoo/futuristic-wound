const { User, Monster } = require("../models"); // Importing User and Monster models from ../models directory
const { signToken, AuthenticationError } = require("../utils/auth"); // Importing signToken function and AuthenticationError class from ../utils/auth
const bcrypt = require("bcrypt"); // Importing bcrypt library for password hashing
const stripe = require("stripe")(
  "sk_test_51PCS10CGe9Scab648nVz5VMlzRjMK91NbRGC9NDJDj3aMVHKrnmgZ0s0FVYOkONP5X4t9CWqQJSWDlQyHM0jm7uA00XJNAQ7I9"
); // Importing and configuring stripe library with secret key

const resolvers = {
  // Defining resolver functions
  Query: {
    // Resolver functions for Query type
    users: async () => {
      // Resolver function for users query
      return User.find().populate("savedMonsters"); // Finding all users and populating savedMonsters field
    },

    // Me query
    me: async (parent, args, context) => {
      // Resolver function for me query
      if (context.user) {
        // Checking if user is authenticated
        const userData = await User.findOne({ _id: context.user._id }) // Finding user by id
          .populate("savedMonsters") // Populating savedMonsters field
          .populate("activeMonster"); // Populating activeMonster field

        return userData; // Returning user data
      }
      // Throw auth error if the user is not logged in
      throw new AuthenticationError("Not Logged In"); // Throwing AuthenticationError if user is not authenticated
    },

    // All monsters query
    allMonsters: async () => {
      // Resolver function for allMonsters query
      try {
        const allMonsters = await Monster.find(); // Finding all monsters
        return allMonsters; // Returning all monsters
      } catch (error) {
        console.error(error); // Logging error
        throw new Error("Unable to fetch all monsters."); // Throwing error
      }
    },

    createCheckoutSession: async (_, { priceId }, context) => {
      // Resolver function for createCheckoutSession query
      try {
        const url = new URL(context.headers.referer).origin; // Getting origin from request headers
        // Create a checkout session using the priceId provided
        const session = await stripe.checkout.sessions.create({
          // Creating checkout session using stripe library
          line_items: [
            {
              price: priceId, // Using the provided priceId
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`, // Setting success URL
          cancel_url: `${url}/`, // Setting cancel URL
        });

        // Return the session information to the client
        return { session: session.id }; // Returning session id
      } catch (error) {
        console.error("Error creating checkout session:", error); // Logging error
        throw new Error("Error creating checkout session"); // Throwing error
      }
    },
  },

  Mutation: {
    // Resolver functions for Mutation type
    login: async (parent, { username, password }) => {
      // Resolver function for login mutation
      // Find user by username in the database, throw an auth error if no user is found with the given username
      const user = await User.findOne({ username }); // Finding user by username
      if (!user) {
        throw new AuthenticationError("Incorrect credentials"); // Throwing AuthenticationError if user not found
      }
      // Check if the password is correct for the user, throw an auth error if the password is incorrect
      const correctPw = await user.isCorrectPassword(password); // Checking if password is correct
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials"); // Throwing AuthenticationError if password is incorrect
      }
      // generate a token for the authenticated user
      const token = signToken(user); // Generating token
      // return the token and the user data
      return { token, user }; // Returning token and user data
    },

    addUser: async (parent, { username, email, password }) => {
      // Resolver function for addUser mutation
      // Create a new user in the database with given username, email and password
      const user = await User.create({ username, email, password }); // Creating new user
      // Generate a token for the newly created user
      const token = signToken(user); // Generating token
      // return the token and the user data
      return { token, user }; // Returning token and user data
    },

    saveMonster: async (parent, { _id }, context) => {
      // Resolver function for saveMonster mutation
      try {
        // Check if the user is authenticated
        if (context.user) {
          // Update the user document in the database to save the monster
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $push: { savedMonsters: _id } }, // Pushing _id to savedMonsters array
            { new: true, runValidators: true }
          );

          return updatedUser; // Return the updated user document
        } else {
          throw new AuthenticationError("You need to be logged in!"); // Throwing AuthenticationError if user not authenticated
        }
      } catch (error) {
        console.error(error); // Logging error
        throw new Error("Unable to save Monster."); // Throwing error
      }
    },

    // Resolver function for changeMonster mutation
    changeMonster: async (parent, { _id, name, image }, context) => {
      try {
        // Check if the user is authenticated
        if (context.user) {
          // Update the user document in the database to change the active monster
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $set: { activeMonster: { _id, name, image } } }, // Setting activeMonster fields
            { new: true, runValidators: true }
          );

          return updatedUser; // Return the updated user document
        } else {
          throw new AuthenticationError("You need to be logged in!"); // Throwing AuthenticationError if user not authenticated
        }
      } catch (error) {
        console.error(error); // Logging error
        throw new Error("Unable to change Monster."); // Throwing error
      }
    },

    initializeMonster: async (_, { _id }, context) => {
      // Resolver function for initializeMonster mutation
      try {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            {
              $set: { activeMonster: _id }, // Setting activeMonster
              $push: { savedMonsters: _id }, // Pushing _id to savedMonsters array
            },
            { new: true, runValidators: true }
          );
          return updatedUser;
        }
      } catch (error) {
        console.error(error); // Logging error
        throw new Error("Unable to initialize Monster."); // Throwing error
      }
    },

    changePassword: async (_, { currentPassword, newPassword }, context) => {
      // Resolver function for changePassword mutation
      try {
        // Check if the user is authenticated
        if (context.user) {
          // Hash the new password
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(newPassword, saltRounds); // Hashing new password

          // Find the user by ID and update the password if the user is found
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $set: { password: hashedPassword } }, // Setting new hashed password
            { new: true }
          );

          if (!updatedUser) {
            throw new Error("User not found"); // Throwing error if user not found
          }

          // Return success message along with the updated user
          return {
            success: true,
            message: "Password changed successfully",
            user: updatedUser,
          };
        } else {
          throw new Error("You need to be logged in!"); // Throwing AuthenticationError if user not authenticated
        }
      } catch (error) {
        console.error(error); // Logging error
        throw new Error("Unable to change password."); // Throwing error
      }
    },
  },
};

module.exports = resolvers; // Exporting resolver object
