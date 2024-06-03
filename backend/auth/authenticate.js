const jwt = require('jsonwebtoken');
const User = require('../models/users');
require('dotenv').config();

const authenticate = async (req, res, next) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        const authHeader = req.header('Authorization');

        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1]; 
        if (!token) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ where: { id: decoded.userId } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user; 
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
};

module.exports = authenticate;
