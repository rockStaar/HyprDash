const express = require("express");    // import express
const http = require("http")
const WebSocket = require('ws')
const metrics = require("./metrics/index.js");    // import metrics functions

const app = express();    // create express app
const server = http.createServer(app);

// WebSocket server
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected via WebSocket");

  // Send metrics every 2 seconds
  const interval = setInterval(async () => {
    try {
      const data = {
        cpu: await metrics.cpuUsage(),
        disk: await metrics.diskUsage(),
        memory: await metrics.checkMemory(),
        network: await metrics.getNetworkUsage(),
      };

      ws.send(JSON.stringify(data));
    } catch (err) {
      console.error("Error collecting metrics:", err);
    }
  }, 2000);

  ws.on("close", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});