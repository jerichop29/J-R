const express = require('express');
const router = express.Router();
const { upload, createMember, getMembers, updateMember, deleteMember, getMemberById, getMemberCount } = require('../controller/memberController');

router.get('/count', getMemberCount);

router.route('/')
  .get(getMembers)
  .post(upload.single('avatar'), createMember);

router.route('/:id')
  .get(getMemberById)
  .put(upload.single('avatar'), updateMember)
  .delete(deleteMember);

module.exports = router;