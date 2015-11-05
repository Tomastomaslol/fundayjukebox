var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

var SpotifyWebApi = require('spotify-web-api-node');
console.log(SpotifyWebApi);

//36bb20a3bfe542b2a3ff404bcb4c6632

var spotifyApi = new SpotifyWebApi({
  clientId : '36bb20a3bfe542b2a3ff404bcb4c6632',
  clientSecret : '5a5b586ce56e4655a5007286a765ca9d'
});

spotifyApi.getPlaylistTracks('bullar77','3V0JjDddnOl15pEKywYZwW')
  .then(function(data) {
    console.log('getPlaylistTracks : ', data.body);
  }, function(err) {
    console.error(err);
  });
console.log(spotifyApi);

// catch 404 and forward to error handler
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
