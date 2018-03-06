var Author = require("../models/authorSchema");
var Book = require("../models/bookSchema");
var Review = require("../models/reviewSchema");

//all the middleware goes here
var middleware = {};

middleware.isLoggedIn = (req, res, next) => {
    //check if the user is authenticated
    if (req.isAuthenticated()) {
        //allow access to the resource
        return next();
        // res.redirect("back");
    }
    //else redirect to the login page
    // res.redirect("/users/login");
    res.redirect("/users/login");
};

middleware.checkReviewOwnership = (req, res, next) => {
    //is the user logged in? - ONLY logged in users can go ahead
    if (req.isAuthenticated()) {
		Book.findOne({ISBN13: req.params.isbn13}).then(book => {
			Review.findOne({ ISBN13: req.params.isbn13 })
            .then(book => {
                if (review.user_id.equals(req.user._id)) {
                    next();
                }
            })
            .catch(err => {
                res.redirect("back");
            });
		})
        
    } else {
        //otherise redirect the user back to his previous page
        res.redirect("back");
    }
};

module.exports = middleware;
