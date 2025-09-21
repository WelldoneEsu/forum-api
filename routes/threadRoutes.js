const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { createThread, getThreads, getThread, deleteThread } = require('../controllers/threadController');

router.post('/', protect, createThread);
router.get('/', getThreads);
router.get('/:id', getThread);
router.delete('/:id', protect, authorizeRoles, deleteThread);

module.exports = router;