//chatRoutes.js

const express = require("express");
const router = express.Router();
const { createChat, getUserChats, getChat } = require("../Controllers/chatController");


router.post("/", createChat);
router.get("/:userId", getUserChats);
router.get("/get/:firstId/:secondId", getChat);

module.exports = router;