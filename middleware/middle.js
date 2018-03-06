var Author = require("../models/authorSchema");
var Book = require("../models/bookSchema");

//all the middleware goes here
var middleware = {};

middleware.isLoggedIn = function(req, res, next) {
	//check if the user is authenticated
	if(req.isAuthenticated()) {
		//allow access to the resource
		return next();
	}
	//else redirect to the login page
	res.redirect("/users/login");
}

module.exports = middleware;