var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	about: String,
	email: String,
	address: String,
	user_img: String,
	wishlist: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Book"
	},
	fav_authors: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Author"
	}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
