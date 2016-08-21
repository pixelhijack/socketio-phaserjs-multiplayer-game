var socket = require('./src/socket.js');

function Play(){
  
  var frogman, 
      minotaur;
  
  this.preload = function(){
    console.log('[Phaser] preload');
    this.game.load.atlas('characters', './assets/spritesheet.png', './assets/sprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
  };
  
  this.create = function(){
    console.log('[Phaser] create');
    this.game.stage.backgroundColor = "#FFFFFF";
    frogman = this.game.add.sprite(40, 100, 'characters');
    frogman.animations.add('walk', ['02', '04', '05', '07', '09', '10'], 10, true);
    frogman.animations.add('attack', ['01', '03', '06', '08'], 10, true);
    frogman.animations.play('attack');
    
    minotaur = this.game.add.sprite(40, 150, 'characters');
    minotaur.animations.add('walk', ['18', '22', '25', '26'], 10, true);
    minotaur.animations.play('walk');
  };
  
  this.update = function(){
    console.log('[Phaser] update');
  };
}

window.onload = function(){
  
    var game = new Phaser.Game(
      window.innerWidth, 
      window.innerHeight, 
      Phaser.AUTO);
      
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