const express = require('express');
const router = express.Router();
const cors = require("cors");
const authMiddleware = require('../middlewares/auth.middleware.js')
const {test, registerUser, loginUser, userProfile} = require('../controllers/auth.controllers.js')
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
router.get('/api/profile', authMiddleware.authUser,userProfile)
module.exports = router