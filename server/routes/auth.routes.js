const express = require('express');
const router = express.Router();
const cors = require("cors");
const authUser = require('../middlewares/auth.middleware.js')
const {test, registerUser, loginUser, userProfile, logOutUser, getAllUsers} = require('../controllers/auth.controllers.js')
//Middlewares
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', test)
router.post('/api/register', registerUser)
router.post('/api/login', loginUser)
router.get('/api/profile', authUser,userProfile)
router.get('/api/logout', authUser, logOutUser)
router.get('/api/all', authUser, getAllUsers)

module.exports = router