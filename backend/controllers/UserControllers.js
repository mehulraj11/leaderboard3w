const User = require("../models/User");
const History = require("../models/History")
// controller of get all user route : "/getusers"
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        // console.log(users);
        res.status(200).json(users);
    } catch (error) {
        console.log("ERROR FETCHING USERS : ", error.message);
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
// controller to updateuser route : "/updateuser"
exports.updateUser = async (req, res) => {
    try {
        const id = req.body.selectedUserId;
        const points = req.body.randomPoints;

        const updatedUser = await User.findOneAndUpdate(
            { _id: id },
            { $inc: { totalPoints: points } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }
        // create claim history with using reference of the user model

        await History.create({
            userId: updatedUser._id,
            points: points
        })

        // update ranking based on the users points

        const allUsers = await User.find().sort({ totalPoints: -1 });

        const bulkOps = allUsers.map((user, index) => ({
            updatedOne: {
                filter: { _id: user._id },
                update: { $set: { rank: index + 1 } },
            },
        }));
        await User.bulkWrite(bulkOps);
        res.status(200).json({ message: "Points and ranks updated successfully.", user: updatedUser });
    } catch (error) {
        console.error("Update User Points Error:", error.message);
        res.status(500).json({ message: "Server error while updating points." });
    }
};

// controllert to fetch the list of claimed points route :"/claimhistory"

exports.getClaimHistory = async (req, res) => {
    try {
        const response = await History.find().populate("userId", "name id");
        res.status(200).json(response);
    } catch (error) {
        console.log("Claim History Error: ", error.message);
        res.status(500).json({ message: error.message });
    }
};
