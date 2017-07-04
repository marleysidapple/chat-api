var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var logger = require('morgan');

const PORT = 7000 || process.env.port;

var app = express();

/* 
 * need to do few things 
 * a. make a connection to mongo database
 * b. include route files
*/

//connection to db
mongoose.connect('mongodb://localhost:27017/chat-app',  { useMongoClient: true });


//setting bodyParser and cookie parser in order to parse the params from the api
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.listen(PORT, function(req, res){
	console.log('App listening on port ' + PORT);
});