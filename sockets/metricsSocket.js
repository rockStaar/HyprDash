const metrics = require("../metrics/index.js");

module.exports = (socket) => {
  console.log("Metrics socket ready for:", socket.id);

  // Send metrics every 2 seconds
  const interval = setInterval(async () => {
    try {
      const data = {
        cpu: await metrics.cpuUsage(),
        disk: await metrics.diskUsage(),
        memory: await metrics.checkMemory(),
        network: await metrics.getNetworkUsage(),
      };
      socket.emit("metricsUpdate", data); // push to client
    } catch (err) {
      console.error("Error collecting metrics:", err);
    }
  }, 2000);

  // Cleanup on disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    clearInterval(interval);
  });
};
