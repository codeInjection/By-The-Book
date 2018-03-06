var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/userSchema"),
    Book = require("../models/bookSchema"),
    Author = require("../models/authorSchema"),
    flash = require("connect-flash"),
    query = "";

/* GET home page. */
router.get("/", function(req, res, next) {
    Book.find({})
        .then(books => {
            res.render("index", {
                title: "By The Book | Home of the Book Readers",
                navInfo: [["Home", ""]],
                books: books
            });
        })
        .catch(err => {
            console.log(err);
        });
});

router.get("/contact", function(req, res, next) {
    res.render("contact", {
        title: "Contact Us | By The Book",
        navInfo: [["Home", ""], ["Contact Us", "contact"]]
    });
});

router.post("/contact", (req, res, next) => {
    var name = req.body.name,
        email = req.body.email,
        message = req.body.message;

    res.redirect("/contact")
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

router.get("/search:searchQuery", (req, res) => {
    console.log("Query is: ", query);
    const regex = new RegExp(escapeRegex(query.toString()), "gi");
    Book.find({ title: regex })
        .then(books => {
            Author.find({ name: regex }).then(authors => {
                res.render("search", {
                    books: books,
                    authors: authors,
                    title: query,
                    navInfo: [["Home", ""], [query, "search:" + query]]
                });
            });
        })
        .catch(err => {
            console.log("Error At Search " + err);
        });
});

router.post("/search", (req, res) => {
    query = req.body.search;
    console.log("query is: " + query);
    //Book.find({name: query}).then(books => {
    res.redirect("/search=" + query);
    // }).catch(err => {
    //   console.log("Error At Search " + err);
    // }) ;
});



function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next();

    // if they aren't redirect them to the login
    res.redirect("/login");
}

module.exports = router;
