var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/userSchema"),
    Book = require("../models/bookSchema"),
    Author = require("../models/authorSchema"),
    Review = require("../models/reviewSchema"),
    flash = require("connect-flash"),
    helpers = require("../middleware/helpers"),
    middleware = require("../middleware/middle");

/* GET users listing. */
router.get("/profile/:profile", middleware.isLoggedIn, function(
    req,
    res,
    next
) {
    var username = req.params.profile;
    //Wishlist.find({})
    //Book.find({ _id: { $in: req.user.wishlist } }, req, res)
    // User.findOne({}).then(users => {console.log(users)})
    User.findOne({ username: username })
        .populate("wishlist readlist fav_authors")
        .exec((err, user) => {
            // console.log(user.wishlist[0].title);
            // console.log(user);
            if (err) {
                console.log(err);
            }
            res.render("userprofile", {
                title: username + " | By The Book",
                wishlist: user.wishlist,
                readlist: user.readlist,
                favAuthors: user.fav_authors,
                navInfo: [
                    ["Home", ""],
                    ["Profile: " + username, "users/profile/" + username]
                ]
            });
        });
});

router.route("/register")
.get((req, res) => {
    res.render("register", {
        title: "Register",
        navInfo: [["Home", ""], ["Register", "register"]]
    });
})
.post(passport.authenticate("local.register", {
        failureRedirect: "/users/register",
        failureFlash: true
    }),
    (req, res) => {
        res.redirect("/users/profile/" + req.user.username);
    }
);

//logout logic
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("logout", "Successfully Logged Out")
    res.redirect("/");
});

router.route("/login")
.get((req, res) => {
    res.render("login", {
        title: "Login | By The Book",
        navInfo: [["Home", ""], ["Login", "login"]],
        message: req.flash("error", "Error in Login!")
    });
})
.post(passport.authenticate("local.login", {
        failureRedirect: "/users/login",
        failureFlash: true
    }),
    (req, res) => {
        res.redirect("/users/profile/" + req.user.username);
    }
);

module.exports = router;
