const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createComment, replyToComment  } = require('../controllers/commentController');

router.post('/:threadId/comments', protect, createComment);
router.post('/comments/:id/reply', protect, replyToComment);


module.exports = router;

