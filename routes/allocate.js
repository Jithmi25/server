const express = require('express');
const router = express.Router();
const allocateController = require('../controllers/allocateController');
const authMiddleware = require('../middleware/auth');

router.post('/autoassign', authMiddleware, allocateController.autoAssignHalls);
router.post('/manual-override', authMiddleware, allocateController.manualOverride);

module.exports = router;
