var express = require('express');
var router = express.Router();
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var createHash = require('./../config/hash');

module.exports = function(passport){
//sign up
// router.post('/register', passport.authenticate('register', {
// 		successRedirect: '/auth/register/success',
// 		failureRedirect: '/auth/register/failure',
// 	}));


router.post('/register', function(req, res, next){

	//filtering the extra params that user might pass
	var acceptedParams = ['password', 'fullname', 'email'];
	var returnedKeys = Object.keys(req.body); 
	if (!_.difference(acceptedParams, returnedKeys)){
		return res.json({'message': 'Invalid request'});
	}

	//now save the user to db
	var newUser = new User();
	newUser.email = req.body.email;
	newUser.password = createHash(req.body.password);
	newUser.fullname = req.body.fullname;
	newUser.save(function(err){
		if(err){
			console.log('error in signup');
		}
		console.log('success');
			return done(null, newUser);
		});

	return res.json(req.body);
});


router.get('/register/failure', function(req, res){
	res.send('failed to register');
});

router.get('/register/success', function(req, res){
	res.send('successfully registered');
});


return router;

}

