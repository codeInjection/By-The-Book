var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/userSchema"),
    Book = require("../models/bookSchema"),
    Author = require("../models/authorSchema"),
    flash = require("connect-flash"),
    helpers = require("../middleware/helpers"),
    middleware = require("../middleware/middle");

//Show author's profile
router.get("/:author_id", (req, res, next) => {
    var author_id = req.params.author_id;
    Author.findOne({ author_id: author_id })
        .then(author => {
            Book.find({ author: author_id })
                .then(books => {
                    res.render("authorprofile", {
                        title: author.name + " | By The Book",
                        author: author,
                        books: books,
                        navInfo: [
                            ["Home", ""],
                            [author.name, "author/" + author_id]
                        ]
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

router.get(
    "/:author_id/addfavoriteauthor",
    middleware.isLoggedIn,
    (req, res) => {

        //find the place with provided ID
    var author_id = req.params.author_id;
    //console.log("The id is this: " + isbn13);
    //console.log("User is " + req.user.username);
    Author.findOne({ author_id: author_id })
        .then(author => {
            //console.log(isbn13 + " " + foundBook);
            //render show view with that book
            User.findOne(
                { username: req.user.username }
                // { $push: { wishlist: book._id } },
                // { new: true }
            )
                .then(user => {
                    // console.log("User is " + user + " save id: " + author._id);
                    if (JSON.stringify(user.fav_authors).includes(author._id)) {
                        helpers.remove(user.fav_authors, author._id);
                    } else {
                        user.fav_authors.push(author._id);
                    }
                    user.save();
                    // var user = req.user;
                    // user.validated = true;
                    // user.save(function(err) {
                    //     // updated the user record
                    // });
                    req.logIn(user, () => {
                        res.redirect("/author/" + author_id);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
    }
);

module.exports = router;
