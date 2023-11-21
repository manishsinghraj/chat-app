const userModel = require("../Models/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const validator = require('validator');

//From frontend we would be getting req (client to sever), we can access params.
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await userModel.findOne({ email });
    if (user) return res.status(400).json("User with the given email already exists!");

    // Check if any of the required fields is empty
    if (!name || !email || !password) return res.status(400).json("All fields are required!");

    // Validate the data
    if (!validator.isEmail(email)) return res.status(400).json("Email must be a valid email");
    if (!validator.isStrongPassword(password)) return res.status(400).json("Password must be a strong password");

    // Create a new user instance
    user = new userModel({ name, email, password });

    // Generate a salt and hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Save the user to the database
    await user.save();
}

module.exports = { registerUser }
