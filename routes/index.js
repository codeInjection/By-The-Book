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

// Go to a custom book page
router.get("/book/ISBN=:isbn13", function(req, res) {
    //find the place with provided ID
    var isbn13 = req.params.isbn13;
    console.log("The id is this: " + isbn13);
    Book.findOne({ ISBN13: isbn13 }, (err, foundBook) => {
        console.log(isbn13 + " " + foundBook);
        if (err) {
            // console.log(err);
            console.log("Error in showing at /:id .... " + err);
        } else {
            //render show view with that book
            res.render("book", {
                book: foundBook,
                title: foundBook.title + " | By The Book"
            });
        }
    });
});

module.exports = router;
