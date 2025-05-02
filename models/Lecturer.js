const mongoose = require('mongoose');

const LecturerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  rank: {
    type: String,
    enum: [
      'Professor',
      'Senior Lecturer Gr (I)',
      'Senior Lecturer Gr (II)',
      'Lecturer',
      'Lecturer (Unconfirmed)',
      'Lecturer (Probationary)',
      'Lab Attendant (Grade III)',
      '-'
    ],
    default: '-',
    required: true
  },
  availability: [
    {
      date: String,
      startTime: String,
      endTime: String
    }
  ],
  dutyCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Lecturer', LecturerSchema);
