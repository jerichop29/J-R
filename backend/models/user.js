// models/user.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: true,
      unique: true
    },
    password: { 
      type: String, 
      required: true 
    },
    firstname: { 
      type: String, 
      required: true 
    },
    lastname: { 
      type: String, 
      required: true 
    },
    type: { 
      type: String, 
      required: true, 
      default: "Admin" 
    },
  },
  { 
    collection: "User" // Forces exact collection name
  }
);

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);