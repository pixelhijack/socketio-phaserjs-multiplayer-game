var FrogmanVsMinotaur = require('./FrogmanVsMinotaur.js');

function GameClient(options){
    options = options || {};
    this.role = options.role || '';
    
    this.game = undefined;
    
    this.setState = function(){
        
    };
    
    // @gameProps: static properties for one-time configuration
    this.initialize = function(gameProps){
        this.game = new Phaser.Game(gameProps.width, gameProps.height, Phaser.AUTO);
        this.game.state.add('FrogmanVsMinotaur', FrogmanVsMinotaur);
    };
    
    // @initialState: first dynamic @state object to kick off
    this.start = function(initialState){
        this.game.state.start('FrogmanVsMinotaur', true, true, { initialState: initialState });
    };
}

module.exports = GameClient;