var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	fullname: String,
	email: String,
	password: String,
	created_at: { type: Date, default: Date.now },
	status: Boolean
});

mongoose.model('User', userSchema);