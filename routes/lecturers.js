const express = require('express');
const router = express.Router();
const lecturerController = require('../controllers/lecturerController');
const authMiddleware = require('../middleware/auth');

router.post('/create', authMiddleware, lecturerController.createLecturer);
router.put('/update/:id', authMiddleware, lecturerController.updateLecturer);
router.get('/schedule', authMiddleware, lecturerController.getThisWeeksSchedule);
router.get('/all', authMiddleware, lecturerController.getAllLecturers);

module.exports = router;
