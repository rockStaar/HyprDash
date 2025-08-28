const express = require("express");
const metrics = require("./metrics/index.js");
const { register, updateMetrics } = require("./prometheus.js");

const app = express();
const PORT = process.env.PORT || 5000;

/*--------------REST API ROUTE---------------------*/
app.get("/metrics", async (req, res) => {
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

/*--------------PROMETHEUS ENDPOINT---------------------*/
app.get("/metrics/prometheus", async (req, res) => {
  await updateMetrics(); // update before serving
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

/*--------------START SERVER---------------------*/
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
