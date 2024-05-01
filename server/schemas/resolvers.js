const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

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

    
    saveMonster: async (parent, {_id, name, image }, context) => {
        try {
          // Check if the user is authenticated
          if (context.user) {
            // Update the user document in the database to save the book 
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $push: { savedMonsters: { _id, name, image } } }, // allows for duplicates 
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

        changeMonster: async (parent, {_id, name, image }, context) => {
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

        initializeMonster: async (parent, {_id, name, image}, context) => {
            try {
                if (context.user) {
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        {
                            $set: { activeMonster: {_id, name, image} },
                            $push: { savedMonsters: {_id, name, image} }
                        },
                        { new: true, runValidators: true }
                    );
                    return updatedUser;
                } else {
                    throw new AuthenticationError("You need to be logged in!");
                }
            } catch (error) {
                console.error(error);
                throw new Error("Unable to initialize Monster.");
            }
        }

  },
};


module.exports = resolvers;
