const express = require('express');
const router = express.Router();
const { body }= require('express-validator');
const {createdProject, authenticateUser, getAllProjects, addUserToProject, getProjectById} = require('../controllers/project.controller');
const authUser = require('../middlewares/auth.middleware.js')

router.post('/create', authenticateUser, createdProject);
router.get('/all', authenticateUser, getAllProjects);
router.put('/add-user', authenticateUser,
    body('projectId').isString().withMessage('Project ID is Required!!'),
    body('users').isArray({ min: 1}).withMessage('Users must be an Array of Strings!!').bail()
    .custom((users) => users.every(user => typeof user === 'string' )).withMessage('Each user must be a String!!'), 
    addUserToProject);
router.get('/get-project/:projectId', authenticateUser, getProjectById);


module.exports = router