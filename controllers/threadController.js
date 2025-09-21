const Thread = require('../models/Thread');


exports.createThread = async (req, res) => {
  try {
    const { title, content } = req.body;
    const thread = await Thread.create({
      title,
      content,
      author: req.user.id,
    });
    res.status(201).json(thread);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create thread', error: err.message });
  }
};

exports.getThreads = async (req, res) => {
  try {
    const threads = await Thread.find().populate('createBy', 'name');
    res.json(threads);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch threads', error: err.message });
  }
};

exports.getThread = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id)
    .populate('createBy', 'name')
    .populate({
        path: 'comments',
        populate: {
            path: 'replies',
            models: 'comments'
        },
    });
    

    if (!thread) return res.status(404).json({ message: 'Thread not found' });

    const comments = await getNestedComments(thread._id);
    res.json(thread);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch thread', error: err.message });
  }
};

exports.deleteThread = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Only admins can delete threads' });

    await Thread.findByIdAndDelete(req.params.id);
    res.json({ message: 'Thread deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete thread', error: err.message });
  }
};