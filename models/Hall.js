const mongoose = require('mongoose');

const HallSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  location: { type: String },
  bookings: [
    {
      date: String,
      startTime: String,
      endTime: String,
      subject: String,
      examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }
    }
  ]
});

module.exports = mongoose.model('Hall', HallSchema);
