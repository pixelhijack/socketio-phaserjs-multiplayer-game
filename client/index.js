var GameClient = require('./src/GameClient.js');
var Play = require('./src/game.js');
var io = require('socket.io-client');

window.onload = function(){
  
    var gameClient = new GameClient(io, {
      verbose: true, 
      onConnect: function(){
        addLine('[CLIENT] on:connect');
      }, 
      onMessage: function(msg){
        addLine('[CLIENT] message: \n' + msg);
      }
    });
  
    var game = new Phaser.Game(560, 272, Phaser.AUTO);
      
    game.state.add('Play', Play);
    game.state.start('Play');
    
    var input = document.getElementById('message');
    
    input.addEventListener('change', function(e){
      gameClient.forAll(e.target.value);
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