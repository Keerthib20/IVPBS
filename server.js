const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/", "index.html"));
});

io.on("connection", function(socket) {
    console.log("A user connected");

    socket.on("disconnect", function() {
        console.log("User disconnected");
    });

    socket.on("chat message", function(data) {
        console.log("Message:", data);
        io.emit("chat message", data);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
