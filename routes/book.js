var express = require("express"),
    router = express.Router(),
    Book = require("../models/bookSchema"),
    Author = require("../models/authorSchema"),
    // Wishlist = require("../models/wishlistSchema"),
    User = require("../models/userSchema"),
    middleware = require("../middleware/middle");

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
    Book.find({
        publish_date: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 30))
        }
    })
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
    // console.log("The id is this: " + isbn13);
    Book.findOne({ ISBN13: isbn13 })
        .then(foundBook => {
            Author.findOne({ author_id: foundBook.author })
                .then(author => {
                    //console.log(isbn13 + " " + foundBook);
                    //render show view with that book
                    res.render("book", {
                        book: foundBook,
                        author: author,
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
        })
        .catch(err => {
            console.log(err);
        });
});

//Add to wishlist
router.get("/ISBN/:isbn13/addtowishlist", middleware.isLoggedIn, function(
    req,
    res
) {
    //find the place with provided ID
    var isbn13 = req.params.isbn13;
    //console.log("The id is this: " + isbn13);
    //console.log("User is " + req.user.username);
    Book.findOne({ ISBN13: isbn13 })
        .then(book => {
            //console.log(isbn13 + " " + foundBook);
            //render show view with that book
            User.findOne(
                { username: req.user.username }
                // { $push: { wishlist: book._id } },
                // { new: true }
            )
                .then(user => {
                    console.log("User is " + user + " save id: " + book._id);
                    user.wishlist.push(book._id);
                    user.save();
                    // var user = req.user;
                    // user.validated = true;
                    // user.save(function(err) {
                    //     // updated the user record
                    // });
                    req.logIn(user, () => {
                        res.redirect("/book/ISBN=" + isbn13);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
});


//Add to readlist
router.get("/ISBN/:isbn13/addtoreadlist", middleware.isLoggedIn, function(
    req,
    res
) {
    //find the place with provided ID
    var isbn13 = req.params.isbn13;
    //console.log("The id is this: " + isbn13);
    //console.log("User is " + req.user.username);
    Book.findOne({ ISBN13: isbn13 })
        .then(book => {
            //console.log(isbn13 + " " + foundBook);
            //render show view with that book
            User.findOne(
                { username: req.user.username }
                // { $push: { wishlist: book._id } },
                // { new: true }
            )
                .then(user => {
                    // console.log("User is " + user + " save id: " + book._id);
                    user.readlist.push(book._id);
                    user.save();
                    // var user = req.user;
                    // user.validated = true;
                    // user.save(function(err) {
                    //     // updated the user record
                    // });
                    req.logIn(user, () => {
                        res.redirect("/book/ISBN=" + isbn13);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;
