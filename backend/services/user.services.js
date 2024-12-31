/*import userModel from "../models/user.model.js";

const createUser = async ({email, password}) => {
  if(!email || !password) {
    throw new Error('Email and Password are Required!!');
  }

  const hashedPassword = userModel.hashPassword(password);

  const user = await userModel.create({
    email, password: hashedPassword
  });

  return user;
}

export default createUser*/

import userModel from '../models/user.model.js';

const createUser = async ({ email, password }) => {
  // Check if the user already exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new Error("Email is already registered.");
  }

  // Hash the password
  const hashedPassword = await userModel.hashPassword(password);

  // Create and save the user
  const user = new userModel({ email, password: hashedPassword });
  return user.save();
};

export default createUser;

