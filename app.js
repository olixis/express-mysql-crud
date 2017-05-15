var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport')
var session = require('express-session')
var LocalStrategy = require('passport-local').Strategy;
var dao = require('./lib/dao');
var index = require('./routes/index');
var users = require('./routes/users');
var userino = require('./routes/userino');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '123 de oliveira 4',
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());

var connection = require('express-myconnection'),
  mysql = require('mysql');

app.use(

  connection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
    debug: false //set true if you wanna see debug logger
  }, 'request')

);

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
});


passport.serializeUser(function (user, done) {
  done(null, user.user_id);
});

passport.deserializeUser(function (id, done) {
  dao.deserialize(pool, "SELECT * FROM t_user WHERE user_id = ? ", [id], done);
});


passport.use(new LocalStrategy(
  function (username, password, done) {

    pool.getConnection(function (err, conn) {
      if (err) return next("Cannot Connect");
      var query = conn.query("SELECT * FROM t_user WHERE name = ? ", [username], function (err, rows) {
        if (err) {
          console.log(err);
          return done(null, false);
        }
        //if user not found
        if (rows.length < 1)
          return done(null, false);
        return done(null, rows[0]);
      });
    });
  }
));







app.use('/', index);
app.use('/api', users);
app.use('/api', userino);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});





// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};



  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
