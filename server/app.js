
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')

var app = module.exports = express.createServer();
var io = require('socket.io').listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.get('/something', function(req, res) {
  res.render('something', { title: 'Express' });
});

app.get('/sponsors', function(req, res) {
  res.render('sponsors', { title: 'Express' });
});

io.sockets.on('connection', function (socket) {
  socket.emit('ready', { success: true });

  socket.on('register', function (data) {
    if (data && data.game) {
      var key = 'game:' + data.game;
      socket.join(key);
    }
  });

  socket.on('controllerEvent', function(data) {
    if (data && data.game) {
      var key = 'game:' + data.game;
      socket.broadcast.emit(key, data);
    }
  });

  socket.on('unregister', function (data) {
    if (data && data.game) {
      var key = 'game:' + data.game;
      socket.leave(key);
    }
  });
});

app.listen(80);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
