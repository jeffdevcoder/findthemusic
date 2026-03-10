const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const songController = require('../controllers/songController');

router.get('/songs', songController.getSongs);
router.post('/songs', authMiddleware, songController.createSong);

module.exports = router;