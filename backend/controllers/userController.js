const User = require('../models/users');

exports.postSignUpUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        await User.create({
            name,
            email,
            password
        });

        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.postLogInUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "User not authorized" });
        }

        res.status(200).json({ message: "User login successful", user });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
