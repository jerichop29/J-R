const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: true, 
      default: "" 
    },
    password: { 
      type: String, 
      required: true, 
      default: "" 
    },
    name: { 
      type: String, 
      required: true, 
      default: "" 
    },
    type: { 
      type: String, 
      required: true, 
      default: "" 
    },
    email: { 
      type: String, 
      required: true, 
      default: "" 
    },
  },
  { 
    timestamps: true,
    collection: "User" // Forces exact collection name
  }
);

// Export the model
module.exports = mongoose.model("User", UserSchema);