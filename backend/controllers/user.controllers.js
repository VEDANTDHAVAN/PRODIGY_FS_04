/*import userModel from '../models/user.model.js';
import createUser from '../services/user.services.js';
import { validationResult } from 'express-validator';

export const createUserController = async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  
  try {
    const user = await createUser(req.body);
    
    const token = await user.generateJWT();

    res.status(201).send(user, token);
  } catch (error) {
    res.status(400).send(error.message);
  }
}*/

import userModel from '../models/user.model.js';
import createUser from '../services/user.services.js';
import { validationResult } from 'express-validator';

export const createUserController = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Create user using service function
    const user = await createUser(req.body);

    // Generate JWT token for the user
    const token = user.generateJWT();

    // Send response with user data and token
    // Exclude sensitive fields (like password) from the response
    const { email, _id , password} = user;
    res.status(201).json({ 
      message: "User registered successfully", 
      user: { id: _id, email, password }, 
      token 
    });
  } catch (error) {
    console.error("Error in createUserController:", error.message);
    res.status(400).json({ error: error.message });
  }
};

export const loginController = async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }
  
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({email})
    
    if(!user){
      res.status(401).json({
        errors: 'Invalid Credentials!!'
      })
    }

    const isMatch = await user.isValidPassword(password);

    if(!isMatch){
      return res.status(401).json({
        errors: 'Invalid Credentials!!'
      })
    }

    const token = await user.generateJWT();

    return res.status(200).json({ user, token })
  } catch (error) {
    res.status(400).send(error.message)
  }
}
