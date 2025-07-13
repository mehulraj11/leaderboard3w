const User = require("../models/User");
// controller of get all user route : "/getusers"
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// controller of creating user route : "/createuser"
exports.createUser = async (req, res) => {
    try {
        const userData = req.body.newUser;
        // console.log(userData);
        const user = await User.create(userData);
        res.status(201).json({ message: "User created", user })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
}