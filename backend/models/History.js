const mongoose = require("mongoose");

const ClaimHistorySchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        points: { type: Number, required: true },
        claimedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

module.exports = mongoose.model("History", ClaimHistorySchema);
