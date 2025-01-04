/*const Project = require('../models/project');
const projectService = require('../helpers/project.service');
const {validationResult} = require('express-validator');
const userModel = require('../models/user');

const createProject = async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {name, email} = req.body;
      const loggedInUser = await userModel.findOne({email});
      const userId = loggedInUser._id;

      const newProject = await projectService.createProject(name, userId);

      res.status(201).json(newProject);
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

module.exports = {createProject}*/
const User = require('../models/user')
const jwt = require("jsonwebtoken");
const Project = require("../models/project");
const createProject = require("../helpers/project.service");
const { validationResult } = require("express-validator");
const userModel = require("../models/user");
const config = require('../controllers/config')
// Secret key for JWT (Store in environment variable)
const JWT_SECRET = config.JWT_SECRET || "your_secret_key";
const redisClient = require('../helpers/redis');

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
  /*try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if user exists
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }*/
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("bearer ")) {
          return res.status(401).json({ error: "Authorization token missing or invalid" });
        }
    
        const token = authHeader.split(" ")[1];

        const isBlackList = await redisClient.get(token);

        if(isBlackList){
            res.cookie('token', '');
            return res.status(401).send({
                error: 'Blacklisted User!!'
            })
        }
        // Verify the token
        const decoded = jwt.verify(token, config.JWT_SECRET);
        console.log(decoded);
        const user = await User.findOne({email: decoded});
        if(!user){
            return res.status(401).json({ error: "User not Found!!"});
        }

        req.user = user;

        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).send({ error: 'Unauthorized User!' });
    }
};

// Controller for creating a project
const createdProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;
    console.log(name);
    if (!name) {
      return res.status(400).json({ error: "Project name is required" });
    }

    // Get the logged-in user's ID from the middleware
    const userId = req.user._id;

    // Create new project
    const newProject = await createProject(name, userId);

    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while creating the project" });
  }
};

module.exports = {
  authenticateUser,
  createdProject,
};
