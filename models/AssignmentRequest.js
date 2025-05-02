const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/AssignmentRequest.json');

function getAllRequests() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function saveRequests(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function createAssignmentRequest(request) {
  const all = getAllRequests();
  request.id = Date.now().toString(); 
  request.status = request.status || 'Pending';
  all.push(request);
  saveRequests(all);
  return request;
}

function updateRequest(id, updates) {
  const all = getAllRequests();
  const index = all.findIndex(r => r.id === id);
  if (index === -1) return null;
  all[index] = { ...all[index], ...updates };
  saveRequests(all);
  return all[index];
}

function findRequests(filterFn) {
  const all = getAllRequests();
  return all.filter(filterFn);
}

module.exports = {
  getAllRequests,
  createAssignmentRequest,
  updateRequest,
  findRequests
};
