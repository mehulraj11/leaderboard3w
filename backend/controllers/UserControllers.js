const User = require("../models/User");

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.createUser = async (req, res) => {
    try {
        const userData = req.body;
        const user = await User.create(userData);
        res.status(201).json({ message: "User created", user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}