var passport = require("passport");
var User = require("../models/userSchema");
var LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById({ _id: id }, (err, user) => {
        done(err, user);
    });
});

passport.use(
    "local.register",
    new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },
        (req, username, password, done) => {
            req.checkBody("username", "Invalid Username").notEmpty();
            req
                .checkBody("password", "Invalid Password")
                .notEmpty()
                .isLength({
                    min: 3
                });

            var errors = req.validationErrors();
            if (errors) {
                var messages = [];
                errors.forEach(error => {
                    messages.push(error.msg);
                });
                return done(null, false, req.flash("error", messages));
            }
            User.findOne(
                {
                    username: username
                },
                (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        return done(null, false, {
                            message: "This username is already being used"
                        });
                    }
                    var newUser = new User();
                    newUser.username = req.body.username;
                    newUser.about = req.body.about;
                    newUser.email = req.body.email;
                    newUser.address = req.body.address;
                    newUser.username = username;
                    newUser.password = newUser.encryptPassword(password);
                    newUser.save((err, result) => {
                        if (err) {
                            return done(err);
                        }
                        return done(null, newUser);
                    });
                }
            );
        }
    )
);

passport.use(
    "local.login",
    new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },
        function(req, username, password, done) {
            req.checkBody("username", "Invalid username").notEmpty();
            req.checkBody("password", "Invalid Password").notEmpty();
            var errors = req.validationErrors();
            if (errors) {
                var messages = [];
                errors.forEach(function(error) {
                    messages.push(error.msg);
                });
                return done(null, false, req.flash("error", messages));
            }
            User.findOne(
                {
                    username: username
                },
                function(err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, {
                            message: "User Not Found!"
                        });
                    }
                    if (!user.validPassword(password)) {
                        return done(null, false, {
                            message: "Invalid Password!"
                        });
                    }
                    return done(null, user);
                }
            );
        }
    )
);
