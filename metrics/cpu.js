// backend/metrics/cpu.js

const os = require('node:os');

function getCpuUsage(){

  const cpus = os.cpus(); // Returns an array of objects containing information about each logical CPU core

  //different cpu time types
 
  let user = 0; //indicates time spent in user-level processes (applications)  
  let nice = 0;  // refers to user processes with adjusted (lower) priority
  let sys = 0;  //is time spent in kernel space (OS tasks)
  let idle = 0;  //is the time the CPU is not doing anything
  let irq = 0;  // is time spent handling hardware interrupts

  for (let cpu of cpus){

    user += cpu.times.user;  // Add up time spent in user mode.
    nice += cpu.times.nice;  // Add up time spent with low priority processes.
    sys += cpu.times.sys;  // Add up time spent in system/kernel mode.
    idle += cpu.times.idle;  // Add up idle (unused) CPU time.
    irq += cpu.times.irq;  // Add up time handling hardware interrupts.

    const total = user + nice + sys + idle + irq;  
  // Calculate total CPU time.

  return { idle, total };  
  // Return only idle and total time snapshot.
   }

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




