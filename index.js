var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session  = require('express-session');

const PORT = 7000 || process.env.port;

//including model files
var userModel = require('./models/User');

// importing list of available routes 
var appRoutes = require('./routes/app');
var authRoutes = require('./routes/auth')(passport);


/* 
 * need to do few things 
 * a. make a connection to mongo database
 * b. include route files
 * c include model files
*/
var database = require('./config/database.js');
mongoose.Promise = global.Promise;
mongoose.connect(database.url, {useMongoClient: true});


var initPassport = require('./config/passport');
initPassport(passport);


var app = express();



//setting bodyParser and cookie parser in order to parse the params from the api
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//to use passport, we need to maintain the sessions as well. setting different config
app.use(session({ 
	secret: 'ilovescotchscotchyscotchscotch',
	saveUninitialized: true,
    resave: true 
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//available routes
//make use of routes
app.use('/', appRoutes);
app.use('/auth', authRoutes);




// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });


app.listen(PORT, function(req, res){
	console.log('App listening on port ' + PORT);
});

module.exports = app;