const express = require('express');
const { login, protectedRoute ,logout,feedbackRoutes, feedbackInsert} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/logout',logout);
router.post('/login', login);
router.post('/owner', authMiddleware, protectedRoute);
router.post('/feedback', feedbackInsert);
router.get('/feedback', feedbackRoutes);
module.exports = router;
