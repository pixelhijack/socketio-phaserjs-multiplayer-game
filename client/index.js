var SocketClient = require('./src/SocketClient.js');
var Play = require('./src/game.js');
var io = require('socket.io-client');

window.onload = function(){
  
    var socketClient = new SocketClient(io, {
      verbose: true, 
      onConnect: function(socket){
        addLine('[CLIENT] '+ socket.id +' connected');
      }, 
      onMessage: function(message){
        addLine('[CLIENT] '+ message.sender +' message: \n' + message.payload);
      }
    });
  
    var game = new Phaser.Game(560, 272, Phaser.AUTO);
      
    game.state.add('Play', Play);
    game.state.start('Play');
    
    var input = document.getElementById('message');
    
    input.addEventListener('change', function(e){
      socketClient.forAll({
        sender: socketClient.socket.id, 
        payload: e.target.value
      });
      input.value = '';
    });
    
    // socket.emit('identify', $scope.name);
    // socket.emit('message', $scope.text);
};
    
function addLine(content){
    var el = document.createElement('div');
    el.innerHTML = content;
    document.getElementById('content').appendChild(el);
}