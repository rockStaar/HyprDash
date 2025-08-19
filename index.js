// backend/index.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { cpuUsage } = require("./metrics/cpu");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// Send CPU usage every 2s
io.on("connection", (socket) => {
  console.log("Client connected");

  const interval = setInterval(async () => {
    const usage = await cpuUsage();
    socket.emit("cpu", { usage: `${usage}%` });
  }, 1000);

  socket.on("disconnect", () => clearInterval(interval));
});

server.listen(3001, () => {
  console.log("Backend server running on http://localhost:3001");
});
