function GameCLient(io, options){
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
      this.log('[CLIENT] on:connect');
      if(options.onConnect){
         options.onConnect(); 
      }
    }.bind(this));
    
    this.socket.on('message', function(msg) {
      this.log('[CLIENT] on:message', msg);
      if(options.onMessage){
         options.onMessage.call(null, msg); 
      }
    }.bind(this));
    
}

module.exports = GameCLient;