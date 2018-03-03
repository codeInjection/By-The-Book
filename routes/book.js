var express = require("express"),
    router = express.Router(),
    Book = require("../models/bookSchema"),
    Author = require("../models/authorSchema");

router.get("/bestsellers", function(req, res, next) {
    Book.find({})
        .then(books => {
            res.render("showall", {
                title: "Best Sellers | By The Book",
                navInfo: [["Home", ""], ["Best Sellers", "book/bestsellers"]],
                books: books
            });
        })
        .catch(err => {
            console.log("Error At BestSeller " + err);
        });
});

router.get("/newarrivals", function(req, res, next) {
    Book.find({ publish_date: { $lte: new Date() - 20 } })
        .then(books => {
            res.render("showall", {
                title: "New Arrivals | By The Book",
                navInfo: [["Home", ""], ["New Arrivals", "book/newarrivals"]],
                books: books
            });
        })
        .catch(err => {
            console.log("Error At BestSeller " + err);
        });
});

router.get("/toprated", function(req, res, next) {
    Book.find({ rating: { $gte: 4 } })
        .then(books => {
            res.render("showall", {
                title: "Top Rated | By The Book",
                navInfo: [["Home", ""], ["Top Rated", "book/toprated"]],
                books: books
            });
        })
        .catch(err => {
            console.log("Error At BestSeller " + err);
        });
});


// Go to a custom book page
router.get("/ISBN=:isbn13", function(req, res) {
    //find the place with provided ID
    var isbn13 = req.params.isbn13;
    console.log("The id is this: " + isbn13);
    Book.findOne({ ISBN13: isbn13 })
        .then(foundBook => {
            //console.log(isbn13 + " " + foundBook);
            //render show view with that book
            res.render("book", {
                book: foundBook,
                navInfo: [
                    ["Home", ""],
                    [foundBook.title, "book/ISBN=" + isbn13]
                ],
                title: foundBook.title + " | By The Book"
            });
        })
        .catch(err => {
            console.log(err);
        });
});
module.exports = router;
