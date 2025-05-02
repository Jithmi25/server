const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/overrideLogs.json');

// get
function getAllLogs() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function saveLogs(logs) {
  fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
}

function addOverrideLog({ user, action, target, targetId, details }) {
  const logs = getAllLogs();

  const newLog = {
    id: Date.now().toString(),
    user,
    action,
    target,
    targetId,
    timestamp: new Date().toISOString(),
    details
  };

  logs.push(newLog);
  saveLogs(logs);
  return newLog;
}

module.exports = {
  getAllLogs,
  addOverrideLog
};
