const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  department: { type: String, required: true },
  studentCount: { type: Number, required: true },
  repeaters: { type: Number, required: true },
  assignedHall: { type: String }, 
  assignedSupervisor: { type: String }, 
  assignedInvigilator: { type: String } 
});

const ExamSchema = new mongoose.Schema({
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  subjects: [SubjectSchema],
  status: {
    type: String,
    enum: ['Open', 'Locked', 'Finished'],
    default: 'Open'
  }
});

module.exports = mongoose.model('Exam', ExamSchema);