const Vote = require('../models/Vote');
const Thread = require('../models/Thread');
const Comment = require('../models/Comment');

// Vote on a Thread
exports.voteThread = async (req, res) => {
  try {
    const { id } = req.params;       // Thread ID from the URL
    const { vote } = req.body;       // Vote value from request body: should be 1 (upvote) or -1 (downvote)

    // Validate vote value
    if (![1, -1].includes(vote)) {
      return res.status(400).json({ message: 'Vote must be 1 (upvote) or -1 (downvote)' });
    }
    // Check if the user has already voted on this thread
    const existingVote = await Vote.findOne({
      userId: req.user.userId,  
      threadId: id
    });

    if (existingVote) {
      return res.status(400).json({ message: 'You have already voted on this thread' });
    }
    // Create and save the new vote
    const newVote = new Vote({
      userId: req.user.userId,
      threadId: id,
      vote
    });
    await newVote.save();
    // Find the thread and update its vote count
    const thread = await Thread.findById(id);
    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }
    // Add the vote to the current vote count
    thread.votes = (thread.votes || 0) + vote;
    await thread.save();

    res.status(201).json({ message: 'Vote cast successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Failed to vote on thread', error: err.message });
  }
};

// Vote on a Comment
exports.voteComment = async (req, res) => {
  try {
    const { id } = req.params;   // Comment ID from the URL 
    const { vote } = req.body;   // Vote value: 1 or -1

    // Validate vote value
    if (![1, -1].includes(vote)) {
      return res.status(400).json({ message: 'Vote must be 1 (upvote) or -1 (downvote)' });
    }
    // Check if the user already voted on this comment
    const existingVote = await Vote.findOne({
      userId: req.user.userId,
      commentId: id
    });
    if (existingVote) {
      return res.status(400).json({ message: 'You have already voted on this comment' });
    }
    // Create and save the new vote
    const newVote = new Vote({
      userId: req.user.userId,
      commentId: id,
      vote
    });
    await newVote.save();
     // Find the comment and update its vote count
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    // Add the vote to the current comment vote count
    comment.votes = (comment.votes || 0) + vote;
    await comment.save();

    res.status(201).json({ message: 'Vote cast successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Failed to vote on comment', error: err.message });
  }
};
