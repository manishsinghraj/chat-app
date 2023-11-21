//userRoute.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, findUser, getUsers } = require('../Controllers/userController');

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/findUser/:userId", findUser);
router.get("/getUsers", getUsers);

module.exports = router;
