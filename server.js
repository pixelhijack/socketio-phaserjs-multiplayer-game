var http = require('http');
var path = require('path');

var socketio = require('socket.io');
var express = require('express');

// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));
var messages = [];
var sockets = [];

io.on('connection', function(socket){
  
  console.log('[SERVER] on:connection', arguments);
  
  sockets.push(socket);
  
  socket.on('disconnect', function(){
    console.log('[SERVER] socket:disconnect', arguments);
    sockets.splice(sockets.indexOf(socket), 1);
  });
  
  socket.on('identify', function (name) {
    console.log('[SERVER] socket:identify', arguments);
    socket.set('name', String(name || 'Anonymous'), function (err) {

    });
  });
  
  socket.on('message', function(msg){
    console.log('[SERVER] socket:message', msg);
    sockets.forEach(function(socket) {
      socket.emit('message', msg);
    });
  });
  
});

/*
io.on('connection', function (socket) {
    messages.forEach(function (data) {
      socket.emit('message', data);
    });

    sockets.push(socket);

    socket.on('disconnect', function () {
      sockets.splice(sockets.indexOf(socket), 1);
    });

    socket.on('message', function (msg) {
      var text = String(msg || '');

      if (!text)
        return;

      socket.get('name', function (err, name) {
        var data = {
          name: name,
          text: text
        };

        broadcast('message', data);
        messages.push(data);
      });
    });

    socket.on('identify', function (name) {
      socket.set('name', String(name || 'Anonymous'), function (err) {

      });
    });
  });

function broadcast(event, data) {
  sockets.forEach(function (socket) {
    socket.emit(event, data);
  });
}
*/

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
