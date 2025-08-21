const os = require("os"); // Import Node.js 'os' module to access system info

// Function to check memory usage
function checkMemory() {
  const totalMem = os.totalmem(); // Get total system memory in bytes
  const freeMem = os.freemem(); // Get free system memory in bytes
  const usedMem = totalMem - freeMem; // Calculate used memory in bytes
  const usedMemPercent = (usedMem / totalMem) * 100; // Calculate memory usage percentage

  return {
    totalMem: (totalMem / (1024 ** 3)).toFixed(2) + " GB", // Convert total memory to GB
    freeMem: (freeMem / (1024 ** 3)).toFixed(2) + " GB", // Convert free memory to GB
    usedMem: (usedMem / (1024 ** 3)).toFixed(2) + " GB", // Convert used memory to GB
    usedMemPercent: usedMemPercent.toFixed(2) + "%" // Format memory usage percentage
  };
}

// Exporting function for use in other files
module.exports = { checkMemory }; // Make checkMemory function available to other modules
