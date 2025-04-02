const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true, 
      default: "About" 
    },
    description: { 
      type: String, 
      required: true, 
      default: "Default description" 
    },
    cv: { 
      data: Buffer,
      contentType: String 
    }
  },
  { 
    timestamps: true,
    collection: "About" // Forces exact collection name
  }
);

// Export the model
module.exports = mongoose.model("About", AboutSchema);