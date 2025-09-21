const Thread = require('../models/Thread');
const Comment = require('../models/Comment');

exports.getAllThreads = async (req, res) => {
    try {
        const threads = await Thread.find().populate('author', 'name');
         res.status(200).json(threads);
    } catch (err) {
    res.status(500).json({ message: 'Failed to fetch threads', error: err.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
    res.status(500).json({ message: 'Failed to delete comment', error: err.message });
    }
};
