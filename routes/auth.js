var express = require('express');
var router = express.Router();

module.exports = function(passport){
//sign up
router.post('/register', passport.authenticate('register', {
		successRedirect: '/auth/register/success',
		failureRedirect: '/auth/register/failure'
	}));


router.get('/register/failure', function(req, res){
	res.send('failed to register');
});

router.get('/register/success', function(req, res){
	res.send('successfully registered');
});


return router;

}

