var _ = require('lodash');

var sanitizeRequestParams = function(requested, expected){
	
	if((_.difference(requested, expected)).length > 0){
		return true;
	}
}

module.exports = sanitizeRequestParams;