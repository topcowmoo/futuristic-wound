// Importing the Schema object from the mongoose library
const { Schema } = require("mongoose");

// Defining the schema for the monster entity
const monsterSchema = new Schema({
  // Field for the name of the monster
  name: {
    type: String, // Data type of the field is String
    required: true, // Field is required (not optional)
    unique: true, // Field values must be unique across documents
  },
  // Field for the ID of the monster
  monsterId: {
    type: String, // Data type of the field is String
    required: true, // Field is required (not optional)
  },
  // Field for the image path of the monster
  image: {
    type: String, // Data type of the field is String
    required: true, // Field is required (not optional)
    default: "public/images/monster1.png", // Default value for the field if not provided explicitly
  },
});

// Exporting the monster schema to be used in other parts of the application
module.exports = monsterSchema;
