var express = require('express');
var router = express.Router();
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var createHash = require('./../config/hash');
var sanitizeRequestParams = require('./../config/requestfilter');

module.exports = function(passport){

router.post('/register', function(req, res){
	//filtering the extra params that user might pass
	var acceptedParams = ['email', 'fullname', 'password'];
	var returnedKeys = Object.keys(req.body); 
	if(sanitizeRequestParams(acceptedParams, returnedKeys)){
		return res.status(500).json({ error: 'invalid request' });	 
	}

	if (req.body.email == "" || req.body.password == "" || req.body.fullname == ""){
		return res.status(500).json({error: 'missing params'});
	}

	//check whether the user is already in the database
	User.findOne({email: req.body.email}, function(err, user){
		if (err){
			return res.status(500).json(err);
		}
		if(user){
			return res.status(500).json({error: 'user already exists'});
		} 
		//now save the user to db
		var newUser = new User();
		newUser.email = req.body.email;
		newUser.password = createHash(req.body.password);
		newUser.fullname = req.body.fullname;
		newUser.save(function(err){
			 if (err) {
		        next(err);
		    }
		    return res.status(200).json({ message: 'user created!' });
		});
	});

});


router.post('/login', function(req, res){
	//filtering the extra params that user might pass
	var acceptedParams = ['email', 'password'];
	var returnedKeys = Object.keys(req.body); 
	if (sanitizeRequestParams(acceptedParams, returnedKeys)){
		return res.status(500).json({ error: 'invalid request' });	 
	}

	User.findOne({email: req.body.email}, function(err, user){
		if (err){
			return res.status(500).json(err);
		}

		if (user){
			//if (createHash())
		}
		
	});


});




return router;

}

