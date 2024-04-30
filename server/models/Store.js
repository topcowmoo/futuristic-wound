const { Schema, model } = require('mongoose');

// Define the schema for the store pack
const storePackSchema = new Schema({
  // Array of monster IDs included in the pack
  monsters: [{
    type: Schema.Types.ObjectId,
    ref: 'Monster' // Reference to the Monster model
  }],
  // Name of the pack
  packName: {
    type: String,
    required: true
  },
  // Image path of the pack
  image: {
    type: String,
    required: true
  },
  // Price of the pack
  price: {
    type: Number,
    required: true
  }
});

// Create the StorePack model
const StorePack = model('StorePack', storePackSchema);

// Export the StorePack model
module.exports = StorePack;
