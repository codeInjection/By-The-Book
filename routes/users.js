var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/userSchema"),
    Book = require("../models/bookSchema"),
    Author = require("../models/authorSchema"),
    flash = require("connect-flash");

/* GET users listing. */
router.get("/profile/:profile", isLoggedIn,function(req, res, next) {
    var username = req.params.profile;
    res.render("userprofile", {
        title: username + " | By The Book",
        navInfo: []
    });
});

router.get("/register", (req, res) => {
    res.render("register", {
        title: "Register",
        navInfo: [["Home", ""], ["Register", "register"]]
    });
});

//handle the sign-up logic
router.post("/register", function(req, res) {
    // res.send("Signing you up...");
    var newUser = new User({
        username: req.body.username,
        about: req.body.about,
        email: req.body.email,
        address: req.body.address,
        wishlist: [],
        fav_authors: []
    });
    User.register(newUser, req.body.password, function(error, user) {
        if (error) {
            console.log(error);
            return res.render("register", {
                title: "Register | By The Book",
                navInfo: [["Home", ""], ["Register", "register"]]
            });
        }

        passport.authenticate("local")(req, res, function() {
            res.redirect("/");
        });
    });
});

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

router.post("/login", passport.authenticate("local"), (req, res) => {
    res.redirect("/users/profile/" + req.user.username);
});


function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();

  // if they aren't redirect them to the login
  res.redirect("/login");
}



module.exports = router;
