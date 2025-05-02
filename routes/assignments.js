const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const authMiddleware = require('../middleware/auth');

router.post('/request', authMiddleware, assignmentController.createRequest);
router.get('/lecturer/schedule', authMiddleware, assignmentController.getLecturerSchedule);
router.get('/admin/view', authMiddleware, assignmentController.viewAllRequests);
router.put('/status/:id', authMiddleware, assignmentController.updateRequestStatus);

module.exports = router;