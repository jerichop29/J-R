const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const About = mongoose.model("About"); // Get the registered model

// GET About data
router.get("/", async (req, res, next) => {
  try {
    const about = await About.findOne();
    if (!about) {
      // Create default if not exists
      const newAbout = await About.create({});
      return res.json(newAbout);
    }
    res.json(about);
  } catch (err) {
    next(err);
  }
});

// PUT Update About data
router.put("/:id", async (req, res, next) => {
  try {
    const updatedAbout = await About.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAbout) {
      return res.status(404).json({ message: "About data not found" });
    }
    res.json(updatedAbout);
  } catch (err) {
    next(err);
  }
});

module.exports = router;