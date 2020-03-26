var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

// 配置文件
var s = require('./atc/configs/cfg.json');

var routes = require('./bps/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'vps/views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'vps/public')));
app.use(session({
  secret: s.base.cookieSecret,
  key: 'sid',
  store: new MongoStore({
    db: s.db.config.name,
    host: s.db.config.host,
    port: s.db.config.port,
    mongooseConnection: mongoose.connection
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30
  },
  resave: true,
  auto_reconnect: true,
  saveUninitialized: true
}));
// app.use(restc.express());

app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  res.locals.loggedIn = req.session.loggedIn;
  next();
});

app.use(function(req, res, next) {
  res.locals.staticDateStamp = s.base.staticDateStamp;
  res.locals.staticFileVersion = s.base.staticFileVersion;
  next();
});

app.use('/', routes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;