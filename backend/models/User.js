const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalPoints: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
}, { timestamps: true });
UserSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("User", UserSchema);