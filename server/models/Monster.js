// Importing the Schema object from the mongoose library
const { Schema, model } = require("mongoose"); // Creating the Monster model based on the monsterSchema const Monster = model("Monster", monsterSchema); before the export statement

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
    default: "", // "public/images/monster1.png"
  },
});

// Exporting the monster schema to be used in other parts of the application
module.exports = monsterSchema;
