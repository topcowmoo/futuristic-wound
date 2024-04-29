// Load environment variables from .env file
require("dotenv").config(); 

// Import Mongoose library
const mongoose = require('mongoose'); 

// Establish database connection using MongoDB URI from environment variables, or fallback to local MongoDB instance
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

// Export the database connection object to be used in other parts of the application
module.exports = mongoose.connection;
