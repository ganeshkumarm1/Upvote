var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var dotenv = require('dotenv');
var session = require('express-session');

require('./config/passport')(passport);

var index = require('./routes/IndexRouter');
var users = require('./routes/UsersRouter');
var home = require('./routes/HomeRouter');
var polls = require('./routes/PollsRouter');
var vote = require('./routes/VoteRouter');

var app = express();

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/public/views'));

app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/public', express.static(__dirname + '/public'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
dotenv.load();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: '1234567890',
    resave: true,
    saveUninitialized: true,
  }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);
app.use('/home', home);
app.use('/polls', polls);
app.use('/vote', vote);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

mongoose.connect(process.env.MONGOURL, () => console.log('Connected to the database') );
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err.message);
  // render the error page
  res.status(err.status || 500);
  res.end('error');
});
*/
module.exports = app;
