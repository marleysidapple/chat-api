var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	fullname: String,
	email: String,
	password: String,
	created_at: { type: Date, default: Date.now },
	status: Boolean
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
//module.exports = mongoose.model('User', userSchema);

mongoose.model('User', userSchema);