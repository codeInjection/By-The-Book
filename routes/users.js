var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/userSchema"),
    Book = require("../models/bookSchema"),
    Author = require("../models/authorSchema"),
    Wishlist = require("../models/wishlistSchema"),
    flash = require("connect-flash"),
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
        .populate("wishlist readlist")
        .exec((err, user) => {
            // console.log(user.wishlist[0].title);
            console.log(user);
            if (err) {
                console.log(err);
            }
            res.render("userprofile", {
                title: username + " | By The Book",
                wishlist: user.wishlist,
                readlist: user.readlist,
                navInfo: [
                    ["Home", ""],
                    ["Profile: " + username, "users/profile/" + username]
                ]
            });
        });
});

router.get("/register", (req, res) => {
    res.render("register", {
        title: "Register",
        navInfo: [["Home", ""], ["Register", "register"]]
    });
});

//handle the sign-up logic
router.post(
    "/register",
    passport.authenticate("local.register", {
        failureRedirect: "/users/register",
        failureFlash: true
    }),
    (req, res) => {
        // // res.send("Signing you up...");
        // var newUser = new User({
        //     username: req.body.username,
        //     about: req.body.about,
        //     email: req.body.email,
        //     address: req.body.address,
        //     wishlist: [],
        //     fav_authors: []
        // });
        // User.register(newUser, req.body.password, function(error, user) {
        //     if (error) {
        //         console.log(error);
        //         return res.render("register", {
        //             title: "Register | By The Book",
        //             navInfo: [["Home", ""], ["Register", "register"]]
        //         });
        //     }

        // passport.authenticate("local")(req, res, function() {
        //     res.redirect("/");
        // });
        res.redirect("/users/profile/" + req.user.username);
    }
);

//logout logic
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login | By The Book",
        navInfo: [["Home", ""], ["Login", "login"]],
        message: req.flash("message")
    });
});

router.post(
    "/login",
    passport.authenticate("local.login", {
        failureRedirect: "/users/login",
        failureFlash: true
    }),
    (req, res) => {
        res.redirect("/users/profile/" + req.user.username);
    }
);

module.exports = router;
