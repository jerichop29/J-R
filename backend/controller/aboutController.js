const About = require("../models/about");

exports.getAllAbout = async (req, res) => {
  try {
    const aboutData = await About.find();
    res.json(aboutData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createAbout = async (req, res) => {
  try {
    const { title, description } = req.body;
    const cv = req.file.buffer; // Access the file buffer

    const about = new About({ title, description, cv });
    const newAbout = await about.save();
    res.status(201).json(newAbout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add update, delete, and getCV functions as needed