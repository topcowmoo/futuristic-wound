const models = require("../models"); // Importing the models module
const db = require("../config/connection"); // Importing the database connection configuration

module.exports = async (modelName, collectionName) => {
  // Exporting an asynchronous function with parameters modelName and collectionName
  try {
    let modelExists = await models[modelName].db.db
      .listCollections({
        // Checking if a collection with the specified name exists in the database
        name: collectionName,
      })
      .toArray();

    if (modelExists.length) {
      // If the collection exists
      // Drop the existing collection
      await db.dropCollection(collectionName); // Dropping the collection from the database
      console.log(`Collection ${collectionName} dropped.`); // Logging a message indicating that the collection has been dropped
    }
  } catch (error) {
    // Handling any errors that occur
    throw error; // Throwing the error for further handling
  }
};
