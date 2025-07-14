const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalPoints: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);