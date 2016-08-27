/*
*   @class Creature
*   @extends Phaser.Sprite
*/
function Creature(game, x, y, sprite){
  
  var state = {
    queue: [],
    current: []
  };
  
  this.game = game;
  
  Phaser.Sprite.call(this, game, x, y, sprite);
  this.game.add.existing(this);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.anchor.setTo(0.5, 0.5);
  
  this.noise = new Phaser.Signal();
  
  this.setState = function(action){
    state.queue.push(action);
  };
  
  this.getState = function(){
    return state.current;
  };
  
  this.updateState = function(currentState){
    //console.log('STATE: ', currentState, state.queue.length);
    switch(currentState.type){
      case 'MOVE':
        this.body.x = currentState.isRight ? ++this.body.x : --this.body.x;
        this.scale.x = currentState.isRight ? 1 : -1;
        this.animations.play('walk');
        break;
        
      case 'ATTACK': 
        this.animations.play('attack');
        break;
        
      default:
        break;
    }
  };
  
  this.update = function(){
    var next = state.queue.shift();
    if(next){
      state.current.push(next);
      this.noise.dispatch(next);
    }
    if(!state.current.length){
      this.animations.play('idle');
      return;
    }
    state.current.forEach(function(currentState, i){
      this.updateState(currentState);
      if(!currentState.until){
        state.current.splice(i, 1);
      }
    }.bind(this));
    
  };
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
  
  this.animations.add('idle', ['22'], 10, true);
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
  
  this.otherPlayers = undefined;
  
  this.init = function(config){
    console.log('[PHASER] init', config);
    this.otherPlayers = config.socketClient;
  };
  
  this.preload = function(){
    console.log('[PHASER] preload');
    this.game.load.image('background', '../assets/background.gif');
    this.game.load.atlas('characters', '../assets/spritesheet.png', '../assets/sprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
  };
  
  this.create = function(){
    console.log('[PHASER] create');
    
    this.game.stage.backgroundColor = "#FFFFFF";
    this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
    
    frogman = new Frogman(this.game, 350, 245, 'characters');
    
    minotaur = new Minotaur(this.game, 40, 215, 'characters');
    
    keys = this.game.input.keyboard.createCursorKeys();
    keys.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    minotaur.noise.add(this.sendState, this);
  };
  
  this.setState = function(state){
    console.log('[PHASER] Game state changed', state);
  };
  
  this.sendState = function(event){
    console.log('[PHASER] sending state', event);
    this.otherPlayers.forAll({
      sender: 'minotaur-id',
      payload: JSON.stringify(minotaur.getState())
    });
  };
  
  this.update = function(){
    console.log('[PHASER] update');
    frogman.animations.play('attack');
      
    if(keys.right.isDown){
      minotaur.setState({ type: 'MOVE', isRight: true });
    } else if(keys.left.isDown){
      minotaur.setState({ type: 'MOVE', isRight: false });
    }else if(keys.space.isDown){
      minotaur.setState({ type: 'ATTACK' });
    }
  };
}

module.exports = FrogmanVsMinotaur;