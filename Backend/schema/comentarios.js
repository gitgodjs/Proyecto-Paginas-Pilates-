const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: String, required: true },
    estrellas: { type: Number, required: true, min: 1, max: 5 },
    date: { type: Date, default: Date.now },
    imageUrl: { type: String, require: false },
});

module.exports = mongoose.model('comentarios', CommentSchema);
