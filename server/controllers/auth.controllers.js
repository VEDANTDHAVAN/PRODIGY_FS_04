const User = require('../models/user');
const {comparePassword, hashPassword} = require('../helpers/auth');
const test = (req, res) => {
    res.json('test is working')
};
const config = require('../controllers/config')
const jwt = require('jsonwebtoken');
const redisClient = require('../helpers/redis')

const registerUser = async (req, res)=> {
    try {
        const {firstname, lastname, email, password, confpassword} = req.body;
        //check if firstname and lastname are entered
        if(!firstname||!lastname){
            return res.json({
                error: 'First name and Last name is Required'
            })
        }
        //check if password is Strong
        if(!password || password.length < 5){
            return res.json({
                error: "Password is required and should be atleast 5 characters"
            })
        }

        //check email
        const exist= await User.findOne({email});
        if(exist){
            return res.json({
                error: "Email is Already Taken!! Try Another Email."
            })
        }
        //encrypt the password
        const hashedPassword = await hashPassword(password)
        //create user in database
        const user = await User.create({
            firstname, lastname, email, 
            password:hashedPassword, 
            confpassword:hashedPassword,
        })

        const token = jwt.sign(user.email, config.JWT_SECRET, { expiresIn: '12h'});
        console.log(user, token);
        return res.status(201).json({user, token})
    } catch (error) {
        console.log(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        //check if user already exists
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                error: 'No user found!!'
            })
        }
        //check if password matches
        const match = await comparePassword(password, user.password)
        if(match){
            //assign a JasonWebToken
            const token = jwt.sign(user.email, config.JWT_SECRET);
            res.status(201).json({user, token})
        }
        if(!match){
            //json response
            res.json({
                error: 'passwords do not match!'
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const userProfile = async (req, res) => {
   console.log(req.user);

   res.status(200).json({
    user: req.user
   });
}

const logOutUser = async (req, res) => {
    try {
      const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
      
      redisClient.set(token, 'logout', 'EX', 60*60*12)

      res.status(200).json({
        message: 'Logged out Successfully!!'
      })
    } catch (error) {
       console.log(error);
       res.status(400).send(error.message); 
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    userProfile
}