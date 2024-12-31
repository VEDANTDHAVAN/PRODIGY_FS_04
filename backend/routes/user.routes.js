import { Router } from "express";
import * as userController from '../controllers/user.controllers.js';
import { body } from "express-validator";

const router = Router();

router.post('/register', 
    body('email').isEmail().withMessage('Email must be Valid!!'), 
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 Characters long!!'),
    userController.createUserController);

router.post('/login', 
    body('email').isEmail().withMessage('Email must be Valid and Registered!!'),
    body('password').isLength({min: 6}).withMessage('Password must be the same as Registered!!'),
    userController.loginController);

export default router;