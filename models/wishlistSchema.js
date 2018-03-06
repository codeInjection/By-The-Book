var mongoose = require("mongoose");

var wishlistSchema = new mongoose.Schema({

    book_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

});

module.exports = mongoose.model("Wishlist", wishlistSchema);
