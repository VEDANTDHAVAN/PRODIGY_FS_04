/*import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "../config.js";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [6, 'Email must be atleast 6 characters long..'],
        maxLength: [50, 'Email must not be longer than 50 characters..']
    },
    password: {
        type: String,
        select: false
    },
}) 

userSchema.statics.hashPassword = async function (password) {
    return bcrypt.hash(password, 10)
}

userSchema.methods.isValidPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

userSchema.methods.generateJWT = function () {
    return jwt.sign({email: this.email}, config.JWT_SECRET)
}

const User = mongoose.model('user', userSchema);

export default User;*/

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config.js";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [6, "Email must be at least 6 characters long."],
    maxLength: [50, "Email must not be longer than 50 characters."],
  },
  password: {
    type: String,
    required: true,
    select: false, // Exclude password by default in queries
  },
});

// Pre-save hook for hashing the password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 10); // Hash password
    } catch (err) {
      return next(err); // Pass error to the next middleware
    }
  }
  next();
});

// Static method to hash passwords
userSchema.statics.hashPassword = async function (password) {
  return bcrypt.hash(password, 10);
};

// Instance method to validate password
userSchema.methods.isValidPassword = async function (password) {
  const user = await this.model("user").findOne({ email: this.email }).select("+password");
  return user && bcrypt.compare(password, user.password);
};

// Instance method to generate JWT
userSchema.methods.generateJWT = function () {
  return jwt.sign({ email: this.email }, config.JWT_SECRET, { expiresIn: "1h" });
};

const User = mongoose.model("user", userSchema);
export default User;
