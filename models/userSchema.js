var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var bcrypt = require("bcrypt-nodejs");

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    about: String,
    email: String,
    address: String,
    user_img: String,
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }],
    readlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }],
    fav_authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    }]
});

userSchema.plugin(passportLocalMongoose);

userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
