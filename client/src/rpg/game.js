import player from './game/player.js'
import ui from './game/ui.js'
import log from './lib/logger.js'
import network from './game/network.js'

export default class game {
    constructor() {
        // setup network
        this._network = new network()
        // setup UI
        this._ui = new ui(this)
        this._gamestate = 0
        this.player = new player(this)    
        this.run()
    }

    setGameState(newgamestate) {       
        log(0, 'test', 'test2')
        if(this._gamestate != newgamestate) {
            this._gamestate = newgamestate
            //this._ui.setGameState(newgamestate)
        }
    }

    run() {
        this._network.sendData({'a': 'test'})
    }
}