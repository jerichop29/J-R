const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: Buffer, required: true },
  },
  { timestamps: true, collection: "Skill"}
);

module.exports = mongoose.model("Skill", SkillSchema);
