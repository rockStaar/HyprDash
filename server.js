const express = require("express");    // import express
const metrics = require("./metrics/index.js");    // import metrics functions

const app = express();    // create express app
const PORT = process.env.PORT || 5000;    // set port (default 5000)

// GET endpoint for metrics
app.get("/metrics", async (req, res) => {
  try {
    const data = {
      cpu: await metrics.cpuUsage(),    // get cpu usage
      disk: await metrics.diskUsage(),    // get disk usage
      memory: await metrics.checkMemory(),    // get memory usage
      network: await metrics.getNetworkUsage(),    // get network usage
    };
    res.json(data);    // send metrics as JSON response
  } catch (err) {
    console.error("Error collecting metrics", err);    // log error
    res.status(500).json({ error: "Failed to collect metrics" });    // send error response
  }
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);    // log server running
});
