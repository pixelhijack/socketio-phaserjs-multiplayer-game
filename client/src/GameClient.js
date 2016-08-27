var FrogmanVsMinotaur = require('./FrogmanVsMinotaur.js');

function GameClient(options){
    options = options || {};
    this.role = options.role || '';
    
    this.game = undefined;
    
    this.acceptState = function(state){
        if(this.game){
            this.game.state.states['FrogmanVsMinotaur'].setState(state);
        }
    };
    
    // @gameProps: static properties for one-time configuration
    this.initialize = function(gameProps){
        this.game = new Phaser.Game(gameProps.width, gameProps.height, Phaser.AUTO, 'gameContainer');
        this.game.state.add('FrogmanVsMinotaur', FrogmanVsMinotaur);
    };
    
    // @initialState: first dynamic @state object to kick off
    this.start = function(initialState, socketClient){
        this.game.state.start('FrogmanVsMinotaur', true, true, { initialState: initialState, socketClient: socketClient });
    };
}

module.exports = GameClient;