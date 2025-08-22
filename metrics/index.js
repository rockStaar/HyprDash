// collects/exports all metrics

const { cpuUsage } = require('./cpu.js');
const { diskUsage } = require('./disk.js');
const { checkMemory } = require('./mem.js');
const { getNetworkUsage } = require('./network.js');

module.exports = {
  cpuUsage,
  diskUsage,
  checkMemory,
  getNetworkUsage
};
