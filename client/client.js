var SocketClient = require('./src/SocketClient.js');
var GameClient = require('./src/GameClient.js');
var io = require('socket.io-client');

window.onload = function(){
  
    var gameClient = new GameClient({});
  
    var socketClient = new SocketClient(io, {
      verbose: true, 
      onConnect: function(socket){
        addLine('[CLIENT] '+ socket.id +' connected');
      }, 
      onHandshake: function(handshake){
        gameClient.initialize({
          width: 560,
          height: 272
        });
        gameClient.start(handshake, socketClient);
      },
      onNewPlayerJoined: function(enemy){
        gameClient.addEnemy(enemy);
      },
      onMessage: function(message){
        addLine('[CLIENT] '+ message.sender +' message: \n' + message.payload);
        gameClient.receiveState(message);
      }
    });
    
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