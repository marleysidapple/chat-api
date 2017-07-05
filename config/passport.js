var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	//needs to serialize and deserialize the user
	passport.serializeUser(function(user, done){
		console.log('serializing user:',user);
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			console.log('deserializing user:',user);
			done(err, user);
		});
	});


	passport.use('register', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	}, function(req, email, password, done ){
		User.findOne({'email': email}, function(err, user){
			if(err){
				console.log('error in signup ' + err)
				return done(err);
			}
			if(user){
				console.log('User already exists');
				return done(null, false);
			} else{
				var newUser = new User();
				newUser.email = email;
				newUser.password = createHash(password);
				newUser.fullname = req.body.fullname;
				newUser.save(function(err){
					if(err){
						console.log('error in signup');
					}
					console.log('success');
					return done(null, newUser);
				});
			}
		});
	})

  );

	var isValidPassword = function(user, password){
			return bCrypt.compareSync(password, user.password);
		};


	// Generates hash using bCrypt
	var createHash = function(password){
			return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};

}


