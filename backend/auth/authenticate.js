const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { json } = require('body-parser');

const authenticate = (req, res, next) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        const token = req.header('Authorization');
        const user = jwt.verify(token, JWT_SECRET);
        console.log(user);
        User.findOne({where: {id: user.userId}})
        .then((user) => {
            console.log(JSON.stringify(user));
            req.user = user;
            next();
        })
        .catch((err) => {
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports = authenticate;
