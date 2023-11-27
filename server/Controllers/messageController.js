// messageController.js 
const messageModel = require("../Models/messageModel");

//createMesage
//getMessages

const createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body;

    try {
        const message = new messageModel({
            chatId, senderId, text
        });

        const response = await message.save();

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getMessages = async (req, res) => {
    const { chatId } = req.params;

    try {
        const message = await messageModel.find({ chatId });
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json(error);
    }
};


module.exports = { createMessage, getMessages };