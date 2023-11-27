const userModel = require("../Models/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const validator = require('validator');


const createJWTToken = (_id) => {
    const jwtKey = process.env.JWT_SECRET_KEY;

    return jwt.sign(
        { _id },
        jwtKey,
        { expiresIn: '3d' }
    );
}

//From frontend we would be getting req (client to sever), we can access params.
const registerUser = async (req, res) => {

    try {

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
        const token = createJWTToken(user._id);

        res.status(200).json({ _id: user._id, name, email, token })
    } catch (error) {
        console.log("Error during creating User : ", error);
        res.status(500).json(error)
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await userModel.findOne({ email });

        if (!user) return res.status(400).json("Invalid user or password!");

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) return res.status(400).json("Invalid user or password!");

        const token = createJWTToken(user._id);

        res.status(200).json({ _id: user._id, name: user.name, email, token });
    } catch (error) {
        console.log("Error during Login User : ", error);
        res.status(500).json(error)
    }

}


const findUser = async (req, res) => {

    try {
        const userId = req.params.userId;

        const user = await userModel.findById(userId);
        if (!user) return res.status(200).json("cannot find user")
        return res.status(200).json(user);

    } catch (error) {
        console.log("Error during Finding User : ", error);
        res.status(500).json(error)
    }
}


const getUsers = async (req, res) => {

    try {
        const users = await userModel.find();
        if (!users) return res.status(200).json("cannot get all users")
        return res.status(200).json(users);

    } catch (error) {
        console.log("Error during getting all Users : ", error);
        res.status(500).json(error)
    }
}

module.exports = { registerUser, loginUser, findUser, getUsers }
