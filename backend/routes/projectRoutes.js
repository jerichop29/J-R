const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Project = mongoose.model("Project"); // Get the registered model

// GET Project data
router.get("/", async (req, res, next) => {
  try {
    const project = await Project.find();
    if (!project) {
      // Create default if not exists
      const newAbout = await Project.create({});
      return res.json(newAbout);
    }
    res.json(project);
  } catch (err) {
    next(err);
  }
});

// PUT Update Project data
router.put("/:id", async (req, res, next) => {
  try {
    const updatedAbout = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAbout) {
      return res.status(404).json({ message: "Project data not found" });
    }
    res.json(updatedAbout);
  } catch (err) {
    next(err);
  }
});

module.exports = router;