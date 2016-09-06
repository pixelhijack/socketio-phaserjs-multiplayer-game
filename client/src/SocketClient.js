function SocketCLient(io, options){
    options = options || {};
    var verbose = options.verbose || false;
    
    this.socket = io.connect();
    
    this.log = function(){
        if(verbose){
            console.info.apply(this, arguments);
        }
    };
    
    this.forAll = function(msg){
        this.socket.emit('message', msg);
    };
    
    this.socket.on('connect', function() {
      this.log('[CLIENT] %s connected', this.socket.id);
      if(options.onConnect){
         options.onConnect.call(null, this.socket); 
      }
    }.bind(this));
    
    this.socket.on('handshake', function(handshake) {
      this.log('[CLIENT] on:handshake', handshake);
      if(options.onHandshake){
         options.onHandshake.call(null, handshake); 
      }
    }.bind(this));
    
    this.socket.on('newplayer', function(player){
      this.log('[CLIENT] on:newplayer', player); 
      if(options.onNewPlayerJoined){
         options.onNewPlayerJoined.call(null, player); 
      }
    }.bind(this));
    
    this.socket.on('message', function(message) {
      this.log('[CLIENT] on:message', message);
      if(options.onMessage){
         options.onMessage.call(null, message); 
      }
    }.bind(this));
    
}

module.exports = SocketCLient;