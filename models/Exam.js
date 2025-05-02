const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/exams.json');

//read exams
function getAllExams() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

//save
function saveExams(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// new
function createExam(exam) {
  const exams = getAllExams();
  exam.id = Date.now().toString(); 
  exam.status = exam.status || 'Open';
  exams.push(exam);
  saveExams(exams);
  return exam;
}

// filter
function findExams(filterFn) {
  const exams = getAllExams();
  return exams.filter(filterFn);
}

module.exports = {
  getAllExams,
  createExam,
  updateExam,
  deleteExam,
  findExams
};
