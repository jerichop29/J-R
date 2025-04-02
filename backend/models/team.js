const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    info: { type: String, required: true },
    avatar: { type: Buffer, required: true }, 
  },
  { timestamps: true, collection: "Team" }
);

module.exports = mongoose.model("Team", TeamSchema);