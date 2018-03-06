var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema({
    text: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },
    rating: Number
});

module.exports = mongoose.model("Review", reviewSchema);
