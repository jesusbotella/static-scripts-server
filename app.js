var express = require('express');

// Dependencies
var path = require('path');
var logger = require('morgan');
var UniversalAnalytics = require('./lib/universalAnalytics');

// Express Config
var app = express();
app.enable('etag');
app.disable('x-powered-by');
app.use(logger('dev'));

// Serve static scripts, logging Pageview in GA
app.use('/scripts', [
  UniversalAnalytics.sendPageview,
  express.static(path.join(__dirname, 'scripts'))
]);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
