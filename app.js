//Import all node modules
var express = require("express"),
    path = require("path"),
    favicon = require("serve-favicon"),
    // logger = require("morgan"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    mongoose = require("mongoose"),
    session = require("express-session"),
    flash = require("connect-flash"),
    expressValidator = require("express-validator"),
    stripe = require("stripe")("sk_test_VBgS3yJD4R1RQHxHQ8CH1HGo");

require("./config/passport.js");

//Import all database schemas
var seedDB = require("./seeds"),
    //User = require("./models/userSchema"),
    Book = require("./models/bookSchema"),
    Author = require("./models/authorSchema"),
    User = require("./models/userSchema");

//Import all routes
var index = require("./routes/index"),
    book = require("./routes/book"),
    category = require("./routes/category"),
    users = require("./routes/users"),
    author = require("./routes/author");

var app = express();



mongoose.connect("mongodb://localhost/bythebook").then(
    () => {
        console.log("Mongoose Connection Successful");
    },
    err => {
        console.log(err);
    }
);

// seedDB();

//PASSPORT CONFIGURATION
app.use(
    session({
        secret: "Books are a creation of godly beings.",
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());
//passport.use(new LocalStrategy(User.authenticate()));
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

//middleware to pass the user info to all routes
app.use(function(req, res, next) {
    //make available inside our template
    res.locals.currentUser = req.user;
    //important: move to the code that handles the route
    next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
// app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(expressValidator());
app.use(
    session({
        secret: "keyboard cat",
        cookie: { maxAge: 60000 }
    })
);
app.use(flash());
app.use(function(req, res, next) {
    res.locals.success_messages = req.flash("success", "Success!");
    res.locals.error_messages = req.flash("error", "Failed!");
    next();
});

//middleware to pass the user info to all routes
app.use(function(req, res, next) {
    //make available inside our template
    res.locals.currentUser = req.user;
    //important: move to the code that handles the route
    next();
});

app.use("/", index);
app.use("/book", book);
app.use("/category", category);
app.use("/users", users);
app.use("/author", author);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
