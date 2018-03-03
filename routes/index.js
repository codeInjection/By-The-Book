var express = require("express"),
    router = express.Router(),
    Book = require("../models/bookSchema"),
    Author = require("../models/authorSchema");

/* GET home page. */
router.get("/", function(req, res, next) {
    Book.find({}).then(books => {
        res
            .render("index", {
                title: "By The Book | Home of the Book Readers",
                navInfo: [["Home", ""]],
                books: books
            })
            .catch(err => {
                console.log(err);
            });
    });
});

router.get("/contact", function(req, res, next) {
    res.render("contact", {
        title: "Contact Us | By The Book",
        navInfo: [["Home", ""], ["Contact Us", "contact"]]
    });
});

router.get("/about", function(req, res, next) {
    res.render("about", {
        title: "About Us | By The Book",
        navInfo: [["Home", ""], ["About Us", "about"]]
    });
});

router.get("/storelocation", function(req, res, next) {
    res.render("storelocation", {
        title: "Our Locations | By The Book",
        navInfo: [["Home", ""], ["Store Location", "storelocation"]]
    });
});

router.get("/showallbooks", (req, res, next) => {
    Book.find({})
        .then(books => {
            res.render("showall", {
                title: "All Books | By The Book",
                navInfo: [["Home", ""], ["All Books", "showallbooks"]],
                books: books
            });
        })
        .catch(err => {
            console.log(err);
        });
});
router.get("/showallauthors", (req, res, next) => {
    Author.find({})
        .then(authors => {
            res.render("showall", {
                title: "All Authors | By The Book",
                navInfo: [["Home", ""], ["All authors", "showallauthors"]],
                authors: authors
            });
        })
        .catch(err => {
            console.log(err);
        });
});

router.get("/book/bestsellers", function(req, res, next) {
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

router.get("/book/newarrivals", function(req, res, next) {
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

router.get("/book/toprated", function(req, res, next) {
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

//Show author's profile
router.get("/author/:author_id", function(req, res, next) {
    var author_id = req.params.author_id;
    Author.findOne({ author_id: author_id })
        .then(author => {
            Book.find({ author: author_id }).then(books => {
                res.render("authorprofile", {
                    title: author.name + " | By The Book",
                    author: author,
                    books: books,
                    navInfo: [
                        ["Home", ""],
                        [author.name, "author/" + author_id]
                    ]
                });
            });
        })
        .catch(err => {
            console.log(err);
        });
    // .populate("author_id")
    // .exec((err, author) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         res.render("authorprofile", {
    //             title: author.name + " | By The Book",
    //             author: author,
    //             navInfo: [
    //                 ["Home", ""],
    //                 [author.name, "author/" + author_id]
    //             ]
    //         });
    //     }
    // });
    // .then(author => {
    //     res.render("authorprofile", {
    //         title: author.name + " | By The Book",
    //         author: author,
    //         navInfo: [["Home", ""], [author.name, "author/" + author_id]]
    //     });
    // })
    // .catch(err => {
    //     console.log("Error At author profile " + err);
    // });
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
                navInfo: [
                    ["Home", ""],
                    [foundBook.title, "book/ISBN=" + isbn13]
                ],
                title: foundBook.title + " | By The Book"
            });
        }
    });
});

module.exports = router;
