const User = require('../models/users');

exports.postSignUpUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    User.create({
        name,
        email,
        password
    })
    .then(() => {
        res.status(201).json({message: "User Create Successfully"});
    })
    .catch((err) => {
        res.status(400).json({message: err.errors[0].message});  
    })
}