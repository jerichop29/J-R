const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Team = mongoose.model("Team"); // Get the registered model

// GET Team data
router.get("/", async (req, res, next) => {
  try {
    const team = await Team.find();
    if (!team) {
      // Create default if not exists
      const newAbout = await Team.create({});
      return res.json(newAbout);
    }
    res.json(team);
  } catch (err) {
    next(err);
  }
});

// PUT Update Team data
router.put("/:id", async (req, res, next) => {
  try {
    const updatedAbout = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAbout) {
      return res.status(404).json({ message: "Team data not found" });
    }
    res.json(updatedAbout);
  } catch (err) {
    next(err);
  }
});

module.exports = router;