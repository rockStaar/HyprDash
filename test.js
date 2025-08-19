const disk = require("diskusage-ng");

function checkDisk() {
  disk("/", (err, info) => {
    if (err) {
      console.error("Error:", err);
    } else {
      console.clear(); // clears the terminal for live effect
      console.log("📀 Disk Usage (refreshed every 2s)");
      console.log("----------------------------");
      console.log(`Available: ${(info.available / (1024 ** 3)).toFixed(2)} GB`);
      console.log(`Free:      ${(info.free / (1024 ** 3)).toFixed(2)} GB`);
      console.log(`Total:     ${(info.total / (1024 ** 3)).toFixed(2)} GB`);
    }
  });
}

// run every 2 seconds
setInterval(checkDisk, 2000);

checkDisk(); 
