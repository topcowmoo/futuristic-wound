const { User, Monster } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const bcrypt = require('bcrypt');
const stripe = require("stripe")(process.env.STRIPE_SECRET); // Removed quotes around process.env.STRIPE_SECRET

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("savedMonsters");
    },

    // Me query
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .populate("savedMonsters")
          .populate("activeMonster");

        return userData;
      }
      // Throw auth error if the user is not logged in
      throw new AuthenticationError("Not Logged In");
    },

    // All monsters query
    allMonsters: async () => {
      try {
        const allMonsters = await Monster.find();
        return allMonsters;
      } catch (error) {
        console.error(error);
        throw new Error("Unable to fetch all monsters.");
      }
    }
  },

  Mutation: {
    // Resolver for login mutation
    login: async (parent, { username, password }) => {
      console.log(username, password);
      // Find user by email in the database, throw an auth error if no user is found with the given email
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      // Check if the password is correct for the user, throw an auth error if the password is incorrect
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      // generate a token for the authenticated user
      const token = signToken(user);
      // return the token and the user data
      return { token, user };
    },

    // Resolver for addUser mutation
    addUser: async (parent, { username, email, password }) => {
      // Create a new user in the database with given username, email and password
      const user = await User.create({ username, email, password });
      // Generate a token for the newly created user
      const token = signToken(user);
      // return the token and the user data
      return { token, user };
   
    },

    saveMonster: async (parent, { _id }, context) => {
      try {
        // Check if the user is authenticated
        if (context.user) {
          // Update the user document in the database to save the book 
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $push: { savedMonsters: _id } }, // allows for duplicates 
            { new: true, runValidators: true }
          );
          
          return updatedUser; // Return the updated user document
        } else {
          throw new AuthenticationError("You need to be logged in!");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Unable to save Monster.");
      }
    },

    changeMonster: async (parent, { _id, name, image }, context) => {
      try {
        // Check if the user is authenticated
        if (context.user) {
          // Update the user document in the database to save the book 
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $set: { activeMonster: { _id, name, image } } },
            { new: true, runValidators: true }
          );
          
          return updatedUser; // Return the updated user document
        } else {
          throw new AuthenticationError("You need to be logged in!");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Unable to change Monster.");
      }
    },

    initializeMonster: async (_, { _id }, context) => {
      try {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            {
              $set: { activeMonster: _id, },
              $push: { savedMonsters: _id, }
            },
            { new: true, runValidators: true }
          );
          return updatedUser;
        } 
      } catch (error) {
        console.error(error);
        throw new Error("Unable to initialize Monster.");
      }
    },

    changePassword: async (_, { currentPassword, newPassword }, context) => {
      try {
        // Check if the user is authenticated 
        if (context.user) {
          // Hash the new password 
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

          // Find the user by ID and update the password if the user is found
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $set: { password: hashedPassword } },
            { new: true } 
          );

          if (!updatedUser) {
            throw new Error("User not found");
          }

          // Return success message along with the updated user 
          return {
            success: true,
            message: "Password changed successfully",
            user: updatedUser
          };
        } else {
          throw new Error("You need to be logged in!");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Unable to change password.");
      }
    },
      
    processPayment: async (_, { amount, token } ) => {
      try {
        const charge = await stripe.charges.create({
          amount,
          currency: "usd",
          source: token,
          description: "Monster Purchase"
        });
        // Handle successful payment
        return {
          success: true,
          message: "Payment processed successfully",
          payment: {
            id: charge.id,
            amount: charge.amount,
            currency: charge.currency,
            status: charge.status
          }
        };
      } catch (error) {
        console.error(error);
        // Handle failed payment
        return {
          success: false,
          message: "Payment failed"
        };  
      }
    }
    
  }
};

module.exports = resolvers;