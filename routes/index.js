var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/userSchema"),
    Book = require("../models/bookSchema"),
    Order = require("../models/orderSchema"),
    Author = require("../models/authorSchema"),
    flash = require("connect-flash"),
    helpers = require("../middleware/helpers"),
    middle = require("../middleware/middle"),
    nodemailer = require('nodemailer'),
    query = "";

/* GET home page. */
var bestsellers = {};
router.get("/", function(req, res, next) {
    Book.find({})
        .then(books => {
            
            res.render("index", {
                title: "By The Book | Home of the Book Readers",
                navInfo: [["Home", ""]],
                books: books,
                logoutMessage: req.flash("logout")
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

        

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: `"${name}" <${email}>`, // sender address
        to: '16138010@gmail.com', // list of receivers
        subject: "Message from " + name, // Subject line
        text: `${message}`, // plain text body
        html: `<b>${message}</b>` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        //console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.redirect(nodemailer.getTestMessageUrl(info));
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});

    
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
    const regex = new RegExp(helpers.escapeRegex(query.toString()), "gi");
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

module.exports = router;
