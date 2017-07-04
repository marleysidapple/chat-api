var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){
	passport.use('register', new LocalStrategy({
		//usernameField: 'email',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	}, function(req, username, password, fullname, status, done ){
		User.findOne({'username': username}, function(err, user){
			if(err){
				console.log('error in signup ' + err)
				return done(err);
			}

			if(user){
				console.log('user already exists');
				return done(null, false);
			} else{
				var newUser = new User();
				newUser.username = username;
				newUser.password = createHash(password);
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


