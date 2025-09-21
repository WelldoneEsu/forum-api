const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
title: { String, required: true },
content: { String, required: true },
author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
comments: { type: mongoose.Schema.Types.ObjectId, ref: 'comments' },
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Thread = mongoose.model('Thread', threadSchema);
module.exports = Thread;