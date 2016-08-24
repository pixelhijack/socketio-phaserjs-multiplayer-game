/*
*   @class Creature
*   @extends Phaser.Sprite
*/
function Creature(game, x, y, sprite){
  this.game = game;
  Phaser.Sprite.call(this, game, x, y, sprite);
  this.game.add.existing(this);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.anchor.setTo(0.5, 0.5);
}
Creature.prototype = Object.create(Phaser.Sprite.prototype);
Creature.prototype.constructor = Creature;
/*
*   @class Frogman
*   @extends Creature
*/
function Frogman(game, x, y, sprite){
  Creature.call(this, game, x, y, sprite);
  this.animations.add('walk', ['02', '04', '05', '07', '09', '10'], 10, true);
  this.animations.add('attack', ['01', '03', '06', '08'], 10, true);
  this.scale.x = -1;
}
Frogman.prototype = Object.create(Creature.prototype);
Frogman.prototype.constructor = Frogman;

/*
*   @class Minotaur
*   @extends Creature
*/
function Minotaur(game, x, y, sprite){
  Creature.call(this, game, x, y, sprite);
  this.anchor.setTo(0.5, 0);
  
  this.animations.add('stand', ['22'], 10, true);
  this.animations.add('walk', ['18', '22', '25', '26'], 10, true);
  this.animations.add('attack', ['16','20','24','27','28', '29'], 12, true);
}
Minotaur.prototype = Object.create(Creature.prototype);
Minotaur.prototype.constructor = Minotaur;

/*
*   FrogmanVsMinotaur
*   @Phaser gamestate
*/
function FrogmanVsMinotaur(){
  
  var frogman, 
      minotaur;
      
  var keys;
  
  this.init = function(config){
    console.log('[Phaser] init', config);
  };
  
  this.preload = function(){
    console.log('[Phaser] preload');
    this.game.load.image('background', '../assets/background.gif');
    this.game.load.atlas('characters', '../assets/spritesheet.png', '../assets/sprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
  };
  
  this.create = function(){
    console.log('[Phaser] create');
    
    this.game.stage.backgroundColor = "#FFFFFF";
    this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
    
    frogman = new Frogman(this.game, 350, 245, 'characters');
    
    minotaur = new Minotaur(this.game, 40, 215, 'characters');
    
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

module.exports = FrogmanVsMinotaur;