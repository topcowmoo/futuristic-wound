const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
// import schema from Monster.js
const monsterSchema = require('./Monster');

// Define the user schema
const userSchema = new Schema(
  {
    // Username field with validation
    username: {
      type: String,
      required: true,
      unique: true, // Ensure username is unique
    },
    // Email field with validation
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
      match: [/.+@.+\..+/, 'Must use a valid email address'], // Validate email format
    },
    // Password field
    password: {
      type: String,
      required: true,
    },
    // Array of saved monsters with reference to Monster schema
    savedMonsters: [monsterSchema],
    // Active monster with reference to Monster schema
    activeMonster: monsterSchema
  },
  // Additional schema options
  {
    // Set virtuals to be included in JSON output
    toJSON: {
      virtuals: true,
    },
  }
);

// Hash user password before saving to the database
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    // Hash the password with bcrypt
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  // Compare the provided password with the hashed password in the database
  return bcrypt.compare(password, this.password);
};

// Virtual field to calculate the number of saved monsters
userSchema.virtual('monsterCount').get(function () {
  return this.savedMonsters.length;
});

// Create the User model
const User = model('User', userSchema);

// Export the User model
module.exports = User;
