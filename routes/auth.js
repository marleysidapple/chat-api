var express = require('express');
var router = express.Router();
var _ = require('lodash');

module.exports = function(passport){
//sign up
// router.post('/register', passport.authenticate('register', {
// 		successRedirect: '/auth/register/success',
// 		failureRedirect: '/auth/register/failure',
// 	}));


router.post('/register', function(req, res, next){

	//filtering the extra params that user might pass
	var acceptedParams = ['email', 'password', 'fullname'];
	var returnedKeys = Object.keys(req.body); 

	if (!_.isEqual(acceptedParams, returnedKeys)){
		return res.json({'message': 'Invalid request'});
	}

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

