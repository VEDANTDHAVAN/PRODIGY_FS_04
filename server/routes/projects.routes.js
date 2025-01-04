const express = require('express');
const router = express.Router();
const { body }= require('express-validator');
const {createdProject, authenticateUser} = require('../controllers/project.controller');
const authUser = require('../middlewares/auth.middleware.js')

router.post('/create', authenticateUser, createdProject);

module.exports = router