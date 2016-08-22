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

function GameServer(io, options){
  options = options || {};
  var verbose = options.verbose || false;
  
  this.io = io;
  this.sockets = [];
  
  this.log = function(){
    if(verbose){
      console.info.apply(this, arguments);
    }
  };
  
  this.broadcast = function(msg){
    this.sockets.forEach(function(socket) {
      socket.emit('message', msg);
    });
  };
  
  this.addSocket = function(socket){
    this.sockets.push(socket);
  };
  
  this.removeSocket = function(socket){
    this.sockets.splice(this.sockets.indexOf(socket), 1);
  };
  
  io.on('connection', function(socket){
    this.log('[SERVER] on:connection');
    
    this.addSocket(socket);
    
    socket.on('message', function(msg){
      this.log('[SERVER] socket:message', msg);
      this.broadcast(msg);
    }.bind(this));
    
    socket.on('disconnect', function(){
      this.log('[SERVER] socket:disconnect');
      this.removeSocket(socket);
    }.bind(this));
    
  }.bind(this));
}

module.exports = GameServer;