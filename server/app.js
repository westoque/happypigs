
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var request = require('request');

var app = module.exports = express.createServer();
var io = require('socket.io').listen(app);
var exec = require('child_process').exec;

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

app.get('/sendsms', function(req, res) {
  exec('curl -d "client_id=9e813527dcd0547354c59426e18f5a90&client_secret=554d777ad94ce104&grant_type=client_credentials&scope=SMS" https://api.att.com/oauth/token', function(err, stdout, stderr) {
    var opts = JSON.parse(stdout);
    var cmd = 'curl -d "cAddress=tel%3A7024814664&Message=Newhighscore" https://apitt.com/rest/sms/2/messaging/outbox?access_token=' + opts.access_token;
    exec(cmd, function(err, stdout, stderr) {
      console.log(stdout);
    });
  });
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
