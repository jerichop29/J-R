const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true }, // Changed from Buffer to String
  },
  { timestamps: true, collection: "Skill" }
);

module.exports = mongoose.model("Skill", SkillSchema);