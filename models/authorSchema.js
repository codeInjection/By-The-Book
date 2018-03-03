var mongoose = require("mongoose");

var authorSchema = new mongoose.Schema({
    author_id: Number,
    name: String,
    description: String,
    dob: Date,
    genre: [String],
    author_img: String
});

module.exports = mongoose.model("Author", authorSchema);
