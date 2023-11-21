//userModel.js
const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 30 },
    email: { type: String, required: true, minLength: 3, maxLength: 200, unique: true },
    password: { type: String, required: true, minLength: 3, maxLength: 1024 },
}, {
    timestamps: true,
});

//create user model
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;