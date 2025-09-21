const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createComment, replyToComment  } = require('../controllers/commentController');
const { voteComment } = require('../controllers/voteController');

router.post('/:threadId/comments', protect, createComment);
router.post('/comments/:id/reply', protect, replyToComment);
router.post('/:id/vote', protect, voteComment);


module.exports = router;

