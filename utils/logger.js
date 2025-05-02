const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '..', 'logs', 'system.log');

exports.logAction = (message) => {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;

  fs.appendFile(logPath, logEntry, (err) => {
    if (err) {
      console.error('Failed to write log:', err);
    }
  });
};
