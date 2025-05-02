const Exam = require('../models/Exam');
const Lecturer = require('../models/Lecturer');
const Hall = require('../models/Hall');
const OverrideLog = require('../models/OverrideLog');
const fs = require('fs');
const path = require('path');

// Log overrides to database
exports.logOverrides = async (req, res) => {
  try {
    const { action, target, targetId, details } = req.body;

    // Basic validation
    if (!action || !target || !targetId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create log entry
    const log = await OverrideLog.create({
      user: req.user.id,
      action,
      target,
      targetId,
      details
    });

    return res.status(201).json({ message: 'Override logged', log });

  } catch (error) {
    console.error('Error logging override:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
