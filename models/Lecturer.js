const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/lecturers.json');

//get lecturers
function getAllLecturers() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

// Save lecturers
function saveLecturers(lecturers) {
  fs.writeFileSync(filePath, JSON.stringify(lecturers, null, 2));
}

// add lecturer
function createLecturer(lecturerData) {
  const lecturers = getAllLecturers();

  const exists = lecturers.find(l => l.email === lecturerData.email);
  if (exists) throw new Error('Lecturer with this email already exists.');

  const newLecturer = {
    id: Date.now().toString(),
    name: lecturerData.name,
    email: lecturerData.email,
    department: lecturerData.department,
    rank: lecturerData.rank || '-',
    availability: [],
    dutyCount: 0
  };

  lecturers.push(newLecturer);
  saveLecturers(lecturers);
  return newLecturer;
}

// availability
function setAvailability(lecturerId, availability) {
  const lecturers = getAllLecturers();
  const index = lecturers.findIndex(l => l.id === lecturerId);
  if (index === -1) throw new Error('Lecturer not found');

  lecturers[index].availability = availability;
  saveLecturers(lecturers);
  return lecturers[index];
}

// Find
function findLecturerById(id) {
  return getAllLecturers().find(l => l.id === id);
}

module.exports = {
  getAllLecturers,
  createLecturer,
  setAvailability,
  findLecturerById
};
