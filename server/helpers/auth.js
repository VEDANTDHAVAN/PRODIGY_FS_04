const bcrypt = require('bcrypt')
const userModel = require('../models/user')
const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if(err){
                reject(err)
            }
            bcrypt.hash(password, salt, (err, hash)=> {
                if(err){
                    reject(err)
                }
                resolve(hash)
            })
        })
    } )
}

const comparePassword = (password, hashed) =>{
    return bcrypt.compare(password, hashed)
}

const getUsers = async ({userId}) => {
   const users = await userModel.find({
    _id: {$ne: userId}
   });
   return users;
}

module.exports = {
    hashPassword,
    comparePassword,
    getUsers
}