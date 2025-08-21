const os = require('node:os');  
// Import the built-in 'os' module to access system information

function getNetworkUsage() {  // Define a function to collect network interface details

    const interfaces = os.networkInterfaces();  // Get all network interfaces available on the system
    const stats = [];  // Initialize an empty array to store filtered network info

    for (let [name, infos] of Object.entries(interfaces)) {  
        // Loop through each network interface (name + its details)

        for (let info of infos) {  
            // Loop through all configurations (IPv4, IPv6, etc.) of this interface

            if (!info.internal && info.family === 'IPv4') {  // Only include external (non-internal) IPv4 addresses
                    stats.push({  
                    iface: name,        // Save interface name (e.g., eth0, wlan0)
                    address: info.address, // Save the IP address
                    mac: info.mac       // Save the MAC address
                });
            }
        }
    }

    return stats;  
    // Return the collected network stats as an array of objects
}

module.exports = { getNetworkUsage };  
// Export the function so it can be used in other files
