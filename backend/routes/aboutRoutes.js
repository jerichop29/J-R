const express = require("express");
const router = express.Router();
const About = require("../models/about");

// GET "About" details
router.get("/", async (req, res) => {
    try {
        const about = await About.findOne();
        res.json(about);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT - Update "About" section
router.put("/:id", async (req, res) => {
    try {
        const updatedAbout = await About.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAbout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
