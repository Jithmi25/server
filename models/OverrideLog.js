const mongoose = require('mongoose');

const OverrideLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: String,
  target: String,
  targetId: String,
  timestamp: { type: Date, default: Date.now },
  details: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('OverrideLog', OverrideLogSchema);
