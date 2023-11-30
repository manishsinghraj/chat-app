// Socket index.js
const { Server } = require("socket.io");

// Create a new instance of Socket.io server with CORS configuration
const io = new Server({ cors: CLIENT_HOST || "http://localhost:5173" });
let onlineUsers = [];

// Listen for new connections
io.on("connection", (socket) => {
    console.log("new Connection", socket.id);

    // Listen to connection (Custom)
    socket.on("addNewUser", (userId) => {
        // Include users that are not already present
        !onlineUsers.some((user) => user.userId === userId) &&
            onlineUsers.push({
                userId,
                socketId: socket.id
            });

        console.log("OnlineUsers", onlineUsers);

        io.emit("getOnlineUsers", onlineUsers);
    });

    //add message
    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find((user) => user.userId === message.recipientId);

        if (user) {
            io.to(user.socketId).emit("getMessage", message);
            io.to(user.socketId).emit("getNotification", {
                senderId: message.senderId,
                isRead: false,
                date: new Date()
            });
        }
    })

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit("getOnlineUsers", onlineUsers);
    });
});

// Start the Socket.io server on port 3000
io.listen(SOCKET_IO_PORT || 3000);
