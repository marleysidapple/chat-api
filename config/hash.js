var bCrypt = require('bcrypt-nodejs');


// var createHash = function(password) {
// 	  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
// };


// var isValidPassword = function(user, password) {
// 	    return bCrypt.compareSync(password, user.password);
//  };


// module.exports = createHash;
// module.exports = isValidPassword;

module.exports = {
	createHash: function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	},

	isValidPassword: function(user, password){
		 return bCrypt.compareSync(password, user.password);
	}
}