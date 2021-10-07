const mongoose = require('mongoose');

let BookSchema = new mongoose.Schema({
    title: String,
    commentcount: {type: Number, default: 0}
});

let Book = new mongoose.model('Book', BookSchema);

module.exports = Book;