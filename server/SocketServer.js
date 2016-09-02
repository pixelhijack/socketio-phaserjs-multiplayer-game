/*
  server: 
  - instantiate io
  - set max sockets limit
  - connect new socket: 
    - store socket
    - give id, set host, send role & initial game state
  - socket message
    - reconciliate socket game state
    - emit state diffs to others
  - disconnect socket
    - store last state
    - set other host
    - restore if reconnected, drop after n timeout
*/

function SocketServer(io, options){
  options = options || {};
  var verbose = options.verbose || false;
  var noop = function(){};
  
  this.io = io;
  this.sockets = [];
  
  this.log = function(){
    if(verbose){
      console.log.apply(this, Array.prototype.slice.call(arguments));
    }
  };
  
  this.onConnection = options.onConnection || noop;
  this.onDisconnect = options.onDisconnect || noop;
  this.onMessage = options.onMessage || noop;
  
  this.broadcast = function(msg){
    this.sockets.forEach(function(socket) {
      socket.broadcast.emit('message', msg);
    });
  };
  
  this.addSocket = function(socket){
    this.sockets.push(socket);
    this.log('[SERVER] % clients connected', this.sockets.length);
  };
  
  this.removeSocket = function(socket){
    this.sockets.splice(this.sockets.indexOf(socket), 1);
  };
  
  io.sockets.on('connection', function(socket){
    this.log('[SERVER] on:connection');
    
    this.addSocket(socket);
    this.onConnection();
    
    socket.on('message', function(msg){
      this.log('[SERVER] socket:message', msg);
      this.onMessage();
      // send all clients except sender
      socket.broadcast.emit('message', msg);
    }.bind(this));
    
    socket.on('disconnect', function(){
      this.log('[SERVER] socket:disconnect');
      this.onDisconnect();
      this.removeSocket(socket);
    }.bind(this));
    
  }.bind(this));
}

module.exports = SocketServer;