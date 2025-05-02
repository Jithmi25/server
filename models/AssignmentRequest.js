const mongoose = require('mongoose');

const AssignmentRequestSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam', 
    required: true
  },
  subjectCode: {
    type: String,
    required: true 
  },
  timeSlot: {
    date: {
      type: String,
      required: true 
    },
    startTime: {
      type: String,
      required: true 
    },
    endTime: {
      type: String,
      required: true 
    }
  },
  requestedLecturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lecturer', 
    required: true 
  },
  role: {
    type: String,
    enum: ['Supervisor', 'Invigilator'],
    required: true ,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('AssignmentRequest', AssignmentRequestSchema);
