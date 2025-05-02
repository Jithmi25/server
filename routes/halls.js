const express = require('express');
const router = express.Router();
const hallController = require('../controllers/hallController');
const authMiddleware = require('../middleware/auth');

router.post('/add', authMiddleware, hallController.addHall);
router.get('/all', authMiddleware, hallController.getAllHalls);
router.put('/update/:id', authMiddleware, hallController.updateHall);

module.exports = router;