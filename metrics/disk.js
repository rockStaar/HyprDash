const disk = require("diskusage-ng"); // Import the diskusage-ng library to check disk usage

function bytesToGB(bytes) {
  return (bytes / (1024 ** 3)).toFixed(2); // Convert bytes into gigabytes with 2 decimal precision
}

function diskUsage(path = "/") {
  return new Promise((resolve, reject) => { // Wrap the disk usage call in a Promise for async handling
    disk(path, (err, info) => { // Get disk usage info for the given path
      if (err) {
        return reject(err); // Reject promise if an error occurs
      }
      const { total, free, available } = info; // Extract total, free, and available space from result
      resolve({

        total: bytesToGB(total),     // Convert total disk size to GB
        free: bytesToGB(free),       // Convert free space to GB
        available: bytesToGB(available) // Convert available space to GB
      
    });
    });
  });
}

module.exports = { diskUsage }; 