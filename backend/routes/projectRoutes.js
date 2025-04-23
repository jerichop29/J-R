const express = require('express');
const router = express.Router();
const { upload, createProject, getProjects, updateProject, deleteProject, getProjectById, getProjectCount } = require('../controller/projectController');


router.get('/count', getProjectCount);

router.route('/')
  .get(getProjects)                // Get all Projects
  .post(upload.single('image'), createProject);  // Create new Project

router.route('/:id')
  .get(getProjectById)          // Get Project by ID
  .put(upload.single('image'), updateProject)    // Update Project
  .delete(deleteProject);          // Delete Project

module.exports = router;