const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const authMiddleware = require('../middleware/auth');

router.post('/create', authMiddleware, examController.createExam);
router.get('/all', authMiddleware, examController.getAllExams);
router.get('/available-to-lecturer', authMiddleware, examController.getAvailableExamsForLecturer);

module.exports = router;