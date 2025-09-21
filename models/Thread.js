const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
title: { type: String, required: true },
content: {type: String, required: true },
author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
votes: { type: Number, default: 0 }
});

const Thread = mongoose.model('Thread', threadSchema);
module.exports = Thread;