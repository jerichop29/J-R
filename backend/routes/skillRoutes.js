const express = require('express');
const router = express.Router();
const { upload, createSkill, getSkills, updateSkill, deleteSkill, getSkillById, getSkillCount } = require('../controller/skillController');

router.get('/count', getSkillCount);

router.route('/')
  .get(getSkills)                // Get all skills
  .post(upload.single('icon'), createSkill);  // Create new skill

router.route('/:id')
  .get(getSkillById)          // Get skill by ID
  .put(upload.single('icon'), updateSkill)    // Update skill
  .delete(deleteSkill);          // Delete skill

module.exports = router;