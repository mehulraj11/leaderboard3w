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
exports.updateUser = async (req, res) => {
    try {
        const id = req.body.selectedUserId;
        const points = req.body.randomPoints;

        const updatedUser = await User.findOneAndUpdate(
            { id: id },
            { $inc: { totalPoints: points } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "Points updated successfully.", user: updatedUser });
    } catch (error) {
        console.error("Update User Points Error:", error.message);
        res.status(500).json({ message: "Server error while updating points." });
    }
};