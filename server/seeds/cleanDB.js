const models = require('../models');
const db = require('../config/connection');

module.exports = async (modelName, collectionName) => {
  try {
    let modelExists = await models[modelName].db.db.listCollections({
      name: collectionName
    }).toArray();

    if (modelExists.length) {
      // Drop the existing collection
      await db.dropCollection(collectionName);
      console.log(`Collection ${collectionName} dropped.`);
    }
  } catch (error) {
    throw error;
  }
}