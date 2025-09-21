const Comment = require('../models/comment.model');
const Thread = require('../models/thread.model');

exports.createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { id: threadId } = req.params;

    const threadExists = await Thread.findById(threadId);
    if (!threadExists) return res.status(404).json({ message: 'Thread not found' });

    const comment = await Comment.create({
      content,
      thread: threadId,
      author: req.user.id,
      parentComment: null,
    });
    res.status(201).json({message: 'Comment added successfully'});
  } catch (err) {
    res.status(500).json({ message: 'Failed to add comment', error: err.message });
  }
};

exports.replyToComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { id: parentId } = req.params;

    const parentComment = await Comment.findById(parentId);
    if (!parentComment) return res.status(404).json({ message: 'Parent comment not found' });

    const reply = await Comment.create({
      content,
      thread: parentComment.thread,
      parentComment: parentId,
      author: req.user.id,
    });
    res.status(201).json({message:'Reply added successfully'});
  } catch (err) {
    res.status(500).json({ message: 'Failed to reply to comment', error: err.message });
  }
};
