const config = require('../controllers/config');
const jwt = require('jsonwebtoken');

const authUser = async (req, res, next) => {
    try {
        // Check for token in cookies or Authorization header
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
        
        // If no token is found, return an error
        if (!token) {
            return res.status(401).send({ error: 'Unauthorized User!' });
        }

        // Verify the token
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;

        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).send({ error: 'Unauthorized User!' });
    }
};

module.exports = {
    authUser
};
