const express = require('express');
const router = express.Router();
const { getAllThreads, deleteComment } = require('../controllers/adminController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Must be authenticated AND have admin role
router.get('/threads', protect, authorizeRoles('admin'), getAllThreads);
router.delete('/comments/:id',  protect, authorizeRoles('admin'), deleteComment);

module.exports = router;
