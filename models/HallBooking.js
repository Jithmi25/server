const mongoose = require('mongoose');

const hallBookingSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, required: true },
  hallId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  assignedStudents: { type: Number, required: true },
});

module.exports = mongoose.model('HallBooking', hallBookingSchema);
