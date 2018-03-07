var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },
    order_date: {
        type: Date,
        default: Date.now
    },
    quantity: Number
});

module.exports = mongoose.model("Order", orderSchema);
