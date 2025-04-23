const express = require('express');
const router = express.Router();
const { upload, getAbout, updateAbout } = require('../controller/aboutController');

router.route('/')
  .get(getAbout)
  .put(upload.single('cv'), updateAbout);

module.exports = router;