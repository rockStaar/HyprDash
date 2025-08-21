// Import the function from network.js
const { getNetworkUsage } = require('./metrics/network');

// Call the function
const networks = getNetworkUsage();

// Print the result
console.log("Network Interfaces:");
console.log(networks);
