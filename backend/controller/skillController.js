const Skill = require('../models/skill');
const multer = require('multer');
const path = require('path');

// Combined file upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `icon-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/svg+xml' || file.mimetype === 'image/svg') {
    cb(null, true);
  } else {
    cb(new Error('Only SVG files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Controller functions
const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create({
      title: req.body.title,
      description: req.body.description,
      icon: `/uploads/${req.file.filename}`
    });
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSkill = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description
    };

    if (req.file) {
      updateData.icon = `/uploads/${req.file.filename}`;
    }

    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }

    res.status(200).json({ success: true, data: skill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.status(200).json({ success: true, data: skill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSkillCount = async (req, res) => {
  try {
    const count = await Skill.countDocuments();
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  upload,
  getSkillById,
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill,
  getSkillCount
};