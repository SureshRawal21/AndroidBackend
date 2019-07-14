var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var middleware = require('./middleware');

var app = express();





// view engine setup
app.set('views', path.join(__dirname, 'views'));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cors());


var userApiRouter = require('./routes/api/user');
app.use('/api/user', userApiRouter);

var collegeApiRouter = require('./routes/api/college');
app.use('/api/college', collegeApiRouter);

var rateApiRouter = require('./routes/api/rate');
app.use('/api/rate', rateApiRouter);

var commentApiRouter = require('./routes/api/comment');
app.use('/api/comment', commentApiRouter);

app.all('/api/*', middleware.checkToken);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

 
});

module.exports = app;
