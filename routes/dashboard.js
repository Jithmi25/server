const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/auth');

router.get('/overview', authMiddleware, dashboardController.getDashboardOverview);
router.get('/statistics', authMiddleware, dashboardController.getStatistics);

module.exports = router;