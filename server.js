const express = require("express");    // import express
const metrics = require("./metrics/index.js");    // import metrics functions

const app = express();    // create express app
const PORT = process.env.PORT || 5000;    // set port (default 5000)

/*--------------ROUTES FOR METRICS---------------------*/

app.get("/metrics", async (req, res) => {   //define GET endpoint at /metrics
  try {
    const data = {     // Create a data object containing system metrics
      cpu: await metrics.cpuUsage(),   // Collect CPU usage asynchronously
      disk: await metrics.diskUsage(),    // Collect disk usage asynchronously
      memory: await metrics.checkMemory(),    // Collect memory usage asynchronously
      network: await metrics.getNetworkUsage(),    // Collect network usage asynchronously
    };
    res.json(data);   //send the metrics data as JSON response
  } catch (err) {
    console.error("Error collecting metrics", err);    // Log any errors in metric collection
    res.status(500).json({ error: "Failed to collect metrics" });    // Return error response if failed
  }
});

// Start the Express server on defined port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);    
});

//log the server URL
