const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const metricsSocket = require("./sockets/metricsSocket.js");

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // later restrict to frontend URL
  },
});

const PORT = process.env.PORT || 5000;

// Basic test route
app.get("/", (req, res) => {
  res.send("HyprDash backend running!");
});

// Setup socket connections
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  metricsSocket(socket); // attach metrics logic for this client
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
