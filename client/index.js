var socket = require('./src/socket.js');
var Play = require('./src/game.js');

window.onload = function(){
  
    var game = new Phaser.Game(560, 272, Phaser.AUTO);
      
    game.state.add('Play', Play);
    game.state.start('Play');
    
    socket.on('connect', function () {
      console.log('[CLIENT] on:connect', arguments);
      addLine('[CLIENT] connected');
    });
    
    socket.on('message', function (msg) {
      console.log('[CLIENT] on:message', arguments);
      addLine('[CLIENT] message: \n' + msg);
    });
    
    var input = document.getElementById('message');
    
    input.addEventListener('change', function(e){
      socket.emit('message', e.target.value);
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