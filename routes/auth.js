var express = require('express');
var router = express.Router();
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var generateHash = require('./../config/hash');
var sanitizeRequestParams = require('./../config/requestfilter');
var jwt = require('jsonwebtoken');
var cipher = require('./../config/secret');

module.exports = function(){
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
					return res.status(500).json({error: true, message: 'This email is already taken'});
				} 
				//now save the user to db
				var newUser = new User();
				newUser.email = req.body.email;
				newUser.password = generateHash.createHash(req.body.password);
				newUser.fullname = req.body.fullname;
				newUser.save(function(err){
					 if (err) {
				        next(err);
				    }
				    return res.status(200).json({ message: 'user created!', user: newUser });
				});
			});

		});

		//login route
		router.post('/login', function(req, res){
			//filtering the extra params that user might pass
			var acceptedParams = ['email', 'password'];
			var returnedKeys = Object.keys(req.body); 
			if (sanitizeRequestParams(acceptedParams, returnedKeys)){
				return res.status(500).json({ error: 'invalid request' });	 
			}

			if (req.body.email == "" || req.body.password == ""){
				return res.status(500).json({error: 'missing params'});
			}

			User.findOne({email: req.body.email}, function(err, user){
				if (err){
					return res.status(500).json(err);
				}
				if (user){
					if (!generateHash.isValidPassword(user, req.body.password)){
						return res.status(500).json({error: 'Invalid username/password combination'});
					} 
					//we need to create a jwt token in here
					var token = jwt.sign(user, cipher.secret, {
						expiresIn: '24h' 
					});
					return res.status(200).json({success: token});
				} else {
					return res.status(500).json({error: 'Invalid Credentials'});
				}
			});
		});

	
	router.post('/user/detail', function(req, res){
		var decodedParams = jwt.verify(req.body.token, cipher.secret);
		return res.status(200).json(decodedParams._doc);
	});


	router.post('/user/profile', function(req, res){
		return;
	});


	return router;
}

