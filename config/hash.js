var bCrypt = require('bcrypt-nodejs');

// module.exports = function(){
// 	var isValidPassword = function(user, password) {
// 	    return bCrypt.compareSync(password, user.password);
// 	};
// 	// Generates hash using bCrypt
// 	var createHash = function(password) {
// 	    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
// 	};
// }
var createHash = function(password) {
	  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

module.exports = createHash;