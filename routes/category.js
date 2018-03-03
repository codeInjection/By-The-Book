var express = require("express"),
    router = express.Router(),
    Book = require("../models/bookSchema"),
    Author = require("../models/authorSchema");

// Go to programming category
router.get("/programming", function(req, res) {
    Book.find({ genre: "Programming" })
        .then(books => {
            //console.log(isbn13 + " " + foundBook);
            //render show view with that book
            res.render("showall", {
                books: books,
                navInfo: [
                    ["Home", ""],
                    ["Category: Programming", "category/programming"]
                ],
                title: "All Programming Books | By The Book"
            });
        })
        .catch(err => {
            console.log(err);
        });
});


// Go to javascript category
router.get("/javascript", function(req, res) {
    Book.find({ genre: "Javascript" })
        .then(books => {
            //console.log(isbn13 + " " + foundBook);
            //render show view with that book
            res.render("showall", {
                books: books,
                navInfo: [
                    ["Home", ""],
                    ["Category: Javascript", "category/javascript"]
                ],
                title: "All Javascript Books | By The Book"
            });
        })
        .catch(err => {
            console.log(err);
        });
});


// Go to programming category
router.get("/sciencefiction", function(req, res) {
    Book.find({ genre: "Science Fiction" })
        .then(books => {
            //console.log(isbn13 + " " + foundBook);
            //render show view with that book
            res.render("showall", {
                books: books,
                navInfo: [
                    ["Home", ""],
                    ["Category: Science Fiction", "category/sciencefiction"]
                ],
                title: "All Science Fiction Books | By The Book"
            });
        })
        .catch(err => {
            console.log(err);
        });
});


// Go to programming category
router.get("/git", function(req, res) {
    Book.find({ genre: "Git" })
        .then(books => {
            //console.log(isbn13 + " " + foundBook);
            //render show view with that book
            res.render("showall", {
                books: books,
                navInfo: [
                    ["Home", ""],
                    ["Category: Git", "category/git"]
                ],
                title: "All Git Books | By The Book"
            });
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;
