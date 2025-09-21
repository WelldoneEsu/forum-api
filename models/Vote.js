const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    threadId: { type: mongoose.Schema.Types.ObjectId, ref: 'thread'},
    commentId:{ type: mongoose.Schema.Types.ObjectId, ref: 'comment'},
    vote: { type: Number, enum:[1, -1], required: true }, // 1 = upvote, -1 = downvote
}, { timestamps: true });

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;