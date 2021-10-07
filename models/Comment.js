const mongoose = require('mongoose');

let CommentSchema = new mongoose.Schema({
    bookid: mongoose.ObjectId,
    text: String
});

let Comment = new mongoose.model('Comment', CommentSchema);

module.exports = Comment;