const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public"))); // Corrected _dirname to __dirname

io.on("connection", function(socket) {
  socket.on("newuser", function(username) {
    socket.broadcast.emit("update", username + " joined the conversation"); // Corrected the string concatenation
  });

  socket.on("exituser", function(username) {
    socket.broadcast.emit("update", username + " left the conversation");
  });

  socket.on("chat", function(message) {
    socket.broadcast.emit("chat", message);
  });
});

server.listen(5501);
