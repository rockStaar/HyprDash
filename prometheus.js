const client = require("prom-client");      //Import prometheus client library
const metrics = require("./metrics/index");  //Import my custom system metrics functions

const register = new client.Registry();   //Created a new Prometheus registry to hold all metrics


client.collectDefaultMetrics({register});   // Collect default Node.js/system metrics into the registry


/* ---------- Define a custom Prometheus gauge metric for CPU usage %------------------*/



const cpuGuage = new client.Gauge({
    name: "system_cpu_usage_percentage",  // Metric name (Prometheus convention: lowercase_with_underscores)
    help:  "CPU usage percentage",         // Description of what this metric measures
});



/* ---------- Define a custom Prometheus gauge metric for Memory usage %------------------*/



const memoryGuage = new client.Gauge({
    name: "system_memory_usage_percentage",
    help: "Memory usage percentage",
});



/* ---------- Define a custom Prometheus gauge metric for Disk usage %------------------*/



const diskGuage = new client.Gauge({
    name: "system_disk_usage_percentage",
    help: "Disk usage percentage",
});



/* ---------- Define a custom Prometheus gauge metric for number of active network interfaces------------------*/



const networkGuage = new client.Gauge({
    name: "system_network_interfaces",
    help: "Number of active network interfaces",
});




// Function to fetch your metrics and update Prometheus gauges with latest values

async function updateMetrics(){
    try {

        //get the values of these functions from index.js file
        const cpu = await metrics.cpuUsage();
        const memory = await metrics.checkMemory();
        const disk = await metrics.diskUsage();
        const network = await metrics.getNetworkUsage();

        cpuGuage.set(cpu.usage || 0); //update prometheus cpu guage witih current value
        memoryGuage.set(memory.percentUsed || 0);
        diskGuage.set(disk.percentUsed || 0);
        networkGuage.set(network.length || 0);
    } catch (err){
        console.error("Error updating Prometheus metrics", err);   // Log errors if fetching fails
    }
}

module.exports = { register, updateMetrics };   // Export registry & update function for use in server.js

