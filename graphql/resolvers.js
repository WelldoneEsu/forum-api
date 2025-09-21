const Thread = require('../models/Thread');
const Comment = require('../models/Comment');
const User = require('../models/User');

module.exports = {
  // Queries
  threads: async () => {
    return await Thread.find()
      .populate('author', 'name')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'name' }
      });
  },

  thread: async ({ id }) => {
    return await Thread.findById(id)
      .populate('author', 'name')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'name' }
      });
  },

  // Mutations
  createThread: async ({ title }, context) => {
    const authorId = context.userId; 
    const thread = new Thread({ title, author: authorId });
    return await thread.save();
  },

  createComment: async ({ threadId, text }, context) => {
    const authorId = context.userId;
    const comment = new Comment({ 
      text, 
      thread: threadId, 
      author: authorId,
      parentComment: null 
    });
    await comment.save();

    // add comment ref to Thread.comments
    await Thread.findByIdAndUpdate(threadId, { $push: { comments: comment._id } });

    return comment;
  },

  replyComment: async ({ commentId, text }, context) => {
    const authorId = context.userId;

    // find parent comment to get thread id
    const parentComment = await Comment.findById(commentId);
    if (!parentComment) throw new Error('Parent comment not found');

    const reply = new Comment({
      text,
      thread: parentComment.thread,
      author: authorId,
      parentComment: commentId
    });

    await reply.save();

    return reply;
  }
};
