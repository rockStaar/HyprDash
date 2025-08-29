// server.js
const express = require("express");
const { register, updateMetrics } = require("./prometheus.js");
const metrics = require("./metrics/index.js");

const app = express();
const PORT = process.env.PORT || 5000;

// REST API endpoint (your JSON API)
app.get("/metrics-json", async (req, res) => {
  try {
    const data = {
      cpu: await metrics.cpuUsage(),
      disk: await metrics.diskUsage(),
      memory: await metrics.checkMemory(),
      network: await metrics.getNetworkUsage(),
    };
    res.json(data);
  } catch (err) {
    console.error("Error collecting metrics", err);
    res.status(500).json({ error: "Failed to collect metrics" });
  }
});

// Prometheus endpoint
app.get("/metrics", async (req, res) => {
  await updateMetrics(); // update gauges
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
