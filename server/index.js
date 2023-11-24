//server.js
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./Routes/userRoute.js");
const chatRouter = require("./Routes/chatRoute.js");
const messageRouter = require("./Routes/messageRoute.js");
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 5001;
const uri = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/chats", chatRouter);
app.use("/api/chats", chatRouter);
app.use("/api/message", messageRouter);


app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`);
});


mongoose.connect(uri).then(() => {
    console.log("MongoDB connection established")
}).catch((error) => {
    console.log("MongoDb Connection Failed:" + error.message)
})
