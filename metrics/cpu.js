// backend/metrics/cpu.js

const os = require('node:os');

function getCpuUsage() {
  const cpus = os.cpus();

  let user = 0, nice = 0, sys = 0, idle = 0, irq = 0;

  for (let cpu of cpus) {
    user += cpu.times.user;
    nice += cpu.times.nice;
    sys  += cpu.times.sys;
    idle += cpu.times.idle;
    irq  += cpu.times.irq;
  }

  const total = user + nice + sys + idle + irq;

  return { idle, total };  // ✅ return after summing all cores
}


function calculateCpuPercent(start, end) {  
// Define function to calculate CPU usage between 2 snapshots.

  const idleDiff = end.idle - start.idle;  // Calculate difference in idle time between snapshots.

  const totalDiff = end.total - start.total;  // Calculate difference in total CPU time.

  const usage = (1 - idleDiff / totalDiff) * 100;  // Compute % of CPU used = (non-idle / total) * 100.

  return usage.toFixed(2);  // Return CPU usage rounded to 2 decimal places.
}


async function cpuUsage() {  
// Define async function to measure real CPU usage.

  const start = getCpuUsage();  // Take first CPU snapshot.

  await new Promise(resolve => setTimeout(resolve, 1000));  // Wait for 1 second to measure change over time.

  const end = getCpuUsage();  // Take second CPU snapshot.

  return calculateCpuPercent(start, end);  // Return CPU usage percentage between snapshots.
}

module.exports = { cpuUsage };  // Export the 'cpuUsage' function so other files can use it.




