const mongoose = require('mongoose');

const assignmentRequestSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
  requestedLecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecturer' },
  timeSlot: {
    date: Date,
    startTime: String,
    endTime: String,
  },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
});

module.exports = mongoose.model('AssignmentRequest', assignmentRequestSchema);
