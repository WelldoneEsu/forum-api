const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { createThread, getThreads, getThread, deleteThread } = require('../controllers/threadController');
const { voteThread } = require('../controllers/voteController');


router.post('/', protect, createThread);
router.get('/', getThreads);
router.get('/:id', getThread);
router.delete('/:id', protect, authorizeRoles, deleteThread);
router.post('/:id/vote', protect, voteThread);


module.exports = router;
