var express = require("express"),
    router = express.Router(),
    Book = require("../models/bookSchema"),
    Author = require("../models/authorSchema");

/* GET home page. */
router.get("/", function(req, res, next) {
    Book.find({}, (err, books) => {
        res.render("index", {
            title: "By The Book | Home of the Book Readers",
            books: books
        });
    });
});

module.exports = router;
