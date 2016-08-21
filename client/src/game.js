function Play(){
  
  var frogman, 
      minotaur;
      
  var keys;
  
  this.preload = function(){
    console.log('[Phaser] preload');
    this.game.load.image('background', '../assets/background.gif');
    this.game.load.atlas('characters', '../assets/spritesheet.png', '../assets/sprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
  };
  
  this.create = function(){
    console.log('[Phaser] create');
    
    this.game.stage.backgroundColor = "#FFFFFF";
    this.game.add.tileSprite(0, 0, 560, 272, 'background');
    
    frogman = this.game.add.sprite(350, 245, 'characters');
    frogman.animations.add('walk', ['02', '04', '05', '07', '09', '10'], 10, true);
    frogman.animations.add('attack', ['01', '03', '06', '08'], 10, true);
    frogman.scale.x = -1;
    frogman.anchor.setTo(0.5, 0.5);
    
    minotaur = this.game.add.sprite(40, 215, 'characters');
    minotaur.animations.add('stand', ['22'], 10, true);
    minotaur.animations.add('walk', ['18', '22', '25', '26'], 10, true);
    minotaur.animations.add('attack', ['16','20','24','27','28', '29'], 12, true);
    frogman.anchor.setTo(0.5, 0.5);
    
    this.game.physics.enable(minotaur, Phaser.Physics.ARCADE);
    
    keys = this.game.input.keyboard.createCursorKeys();
    keys.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  };
  
  this.update = function(){
    console.log('[Phaser] update');
    frogman.animations.play('attack');
    
    if(keys.right.isDown){
        minotaur.animations.play('walk');
        minotaur.body.x += 1;
        minotaur.scale.x = 1;
    }
    else if(keys.left.isDown){
        minotaur.animations.play('walk');
        minotaur.body.x -= 1;
        minotaur.scale.x = -1;
    }
    else if(keys.space.isDown){
        minotaur.animations.play('attack');
    }
    else {
        minotaur.animations.play('stand');
    }
  };
}

module.exports = Play;