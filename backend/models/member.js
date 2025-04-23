const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    info: { type: String, required: true },
    avatar: { type: String, required: true },
  },
  { timestamps: true, collection: "Member" }
);

module.exports = mongoose.model("Member", MemberSchema);
