const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Skill = mongoose.model("Skill"); // Get the registered model

// GET Skill data
router.get("/", async (req, res, next) => {
  try {
    const skill = await Skill.findOne();
    if (!skill) {
      // Create default if not exists
      const newSkill = await Skill.create({});
      return res.json(newSkill);
    }
    res.json(skill);
  } catch (err) {
    next(err);
  }
});

// PUT Update Skill data
router.put("/:id", async (req, res, next) => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSkill) {
      return res.status(404).json({ message: "Skill data not found" });
    }
    res.json(updatedSkill);
  } catch (err) {
    next(err);
  }
});

module.exports = router;