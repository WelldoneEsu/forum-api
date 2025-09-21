const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
content: { type: String, required: true },
author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
thread: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread' },
parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;