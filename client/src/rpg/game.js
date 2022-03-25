import player from './game/player.js'
import ui from './game/ui.js'
import log from './lib/logger.js'
import network from './game/network.js'
import graphics from './game/graphics.js'
import events from './game/events.js'
export default class game {
    constructor() {
        // setup network
        this._network = new network()
        // setup UI
        this._ui = new ui(this)
        // setup graphics
        this._graphics = new graphics(this)
        // setup events
        this._events = new events(this)
        // setup player
        this._player = new player(this)    

        this._graphics.startLoop()

        




        // where do i put these?
        this._gamestate = 0
        this.run()

        // this object connects network input/output with the graphical representation

        // the ui module listens to user input which it sends via the network module to the server
        // and displays information, both in html5 and pixi-rendered

        // network listenes on socket, pushes incomming traffic into the required queue
        // the other modules can use it to send data to the server (also with queues?)

        // graphics has an input queue, filled by ui and network, which is read in the update loop 
        // and rearranges the graphics 
    }

    run() {
        
    }


    setGameState(newgamestate) {       
        log(0, 'test', 'test2')
        if(this._gamestate != newgamestate) {
            this._gamestate = newgamestate
            //this._ui.setGameState(newgamestate)
        }
    }

}