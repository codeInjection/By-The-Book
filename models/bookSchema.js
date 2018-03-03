var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
    ISBN13: {
        type: String,
        required: true,
        maxlength: 13,
        minlength: 13
    },
    description: {
        type: String,
        required: true
    },
    pages: Number,
    price: Number,
    title: String,
    language: String,
    rating: Number,
    book_img: String,
    quantity: Number,
    publisher: String,
    publish_date: Date,
    genre: [String],
    author: {
        type: Number,
        ref: "Author"
    },
    website: String
});

module.exports = mongoose.model("Book", bookSchema);
