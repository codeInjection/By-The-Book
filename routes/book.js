var express = require("express"),
    router = express.Router(),
    Book = require("../models/bookSchema"),
    Author = require("../models/authorSchema"),
    Review = require("../models/reviewSchema"),
    Order = require("../models/orderSchema"),
    User = require("../models/userSchema"),
    helpers = require("../middleware/helpers"),
    middleware = require("../middleware/middle"),
    stripe = require("stripe")("sk_test_VBgS3yJD4R1RQHxHQ8CH1HGo");

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
            console.log("Error At new arrivals " + err);
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
            console.log("Error At toprated " + err);
        });
});

// Go to a custom book page
router.route("/ISBN=:isbn13").get((req, res) => {
    //find the place with provided ID
    var isbn13 = req.params.isbn13;
    // console.log("The id is this: " + isbn13);
    Book.findOne({ ISBN13: isbn13 })
        .then(book => {
            Author.findOne({ author_id: book.author })
                .then(author => {
                    //console.log(isbn13 + " " + book);
                    //render show view with that book
                    Review.find({ book_id: book._id })
                        .populate("user_id book_id")
                        .exec((err, reviews) => {
                            if (err) {
                                console.log(err);
                            } else {
                                //console.log(reviews);
                                let ratingSum = 0;
                                reviews.forEach(review => {
                                    ratingSum += review.rating;
                                });

                                let ratingAverage = ratingSum / reviews.length;
                                if (ratingAverage) {
                                    book.rating = ratingAverage;
                                    book.save();
                                }

                                res.render("book", {
                                    book: book,
                                    author: author,
                                    reviews: reviews,
                                    ratingAverage: ratingAverage,
                                    navInfo: [
                                        ["Home", ""],
                                        [book.title, "book/ISBN=" + isbn13]
                                    ],
                                    title: book.title + " | By The Book"
                                });
                            }
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
router.get("/ISBN/:isbn13/addtowishlist", middleware.isLoggedIn, (req, res) => {
    //find the book with provided params
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
                    if (JSON.stringify(user.wishlist).includes(book._id)) {
                        helpers.remove(user.wishlist, book._id);
                    } else {
                        user.wishlist.push(book._id);
                    }
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

//Add to wishlist
router.get("/ISBN/:isbn13/addtoreadlist", middleware.isLoggedIn, (req, res) => {
    //find the book with provided params
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
                    if (JSON.stringify(user.readlist).includes(book._id)) {
                        helpers.remove(user.readlist, book._id);
                    } else {
                        user.readlist.push(book._id);
                    }
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

//Add to review
router.post("/ISBN/:isbn13/addreview", middleware.isLoggedIn, (req, res) => {
    var isbn13 = req.params.isbn13;
    var reviewText = req.body.reviewText;
    var rating = req.body.rating;

    Book.findOne({ ISBN13: isbn13 })
        .then(book => {
            User.findOne({ username: req.user.username })
                .then(user => {
                    var reviewData = {
                        user_id: user._id,
                        book_id: book._id,
                        text: reviewText,
                        rating: rating,
                        review_date: new Date()
                    };
                    Review.find({ user_id: user._id, book_id: book._id }).then(
                        userReviews => {
                            console.log("Finding reviews!");
                            if (userReviews.length > 0) {
                                console.log("Already reviewed!");
                                res.redirect("/book/ISBN=" + isbn13);
                            } else {
                                Review.create(reviewData)
                                    .then(review => {
                                        //console.log("Review Posted!");
                                        res.redirect("/book/ISBN=" + isbn13);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    });
                            }
                        }
                    );
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
});

//Delete review
router.get(
    "/ISBN/:isbn13/deletereview",
    middleware.checkReviewOwnership,
    (req, res) => {
        var isbn13 = req.params.isbn13;
        //console.log("At delete route!");
        Book.findOne({ ISBN13: isbn13 })
            .then(book => {
                //console.log("Inside Book!");
                Review.findOneAndRemove({
                    book_id: book._id,
                    user_id: req.user._id
                })
                    .then(() => {
                        //console.log("Review Deleted!");
                        res.redirect("/book/ISBN=" + isbn13);
                    })
                    .catch(err => {
                        console.log(err);
                        //res.redirect("back");
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }
);

//Buy now!
router
    .route("/ISBN/:isbn13/buynow")
    .get(middleware.isLoggedIn, (req, res) => {
        var isbn13 = req.params.isbn13;

        Book.findOne({ ISBN13: isbn13 }).then(book => {
            res.render("buynow", {
                title: "Checkout",
                book: book,
                navInfo: [["Home", ""], [book.title, "book/ISBN=" + isbn13]]
            });
        });
    })
    .post(middleware.isLoggedIn, (req, res) => {
        var isbn13 = req.params.isbn13;
        var quantity = req.body.quantity;
        var token = req.body.stripeToken;

        Book.findOne({ ISBN13: isbn13 })
            .then(book => {
                if (book.quantity < quantity) {
                    console.log("Not enough quantity!");
                    res.redirect("/book/ISBN=" + isbn13);
                } else {
                    book.quantity -= quantity;
                    book.save();
                    orderData = {
                        user_id: req.user._id,
                        book_id: book._id,
                        order_date: new Date(),
                        quantity: quantity
                    };
                    Order.create(orderData);
                    // Charge the user's card:
                    // stripe.charges.create(
                    //     {
                    //         amount: book.price * 100 * quantity,
                    //         currency: "PKR",
                    //         description: "Example charge",
                    //         source: token
                    //     },
                    //     function(err, charge) {
                    //         // asynchronously called
                    //         if (err) {
                    //             console.log(err);
                    //         }

                    //         console.log(charge)
                    //     }
                    // );
                    res.redirect("/book/ISBN=" + isbn13);
                }
            })
            .catch(err => {
                console.log(err);
            });
    });

//helper functions

module.exports = router;
