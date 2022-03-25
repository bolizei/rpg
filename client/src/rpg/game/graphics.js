import $ from 'jquery'
import * as PIXI from 'pixi.js'
import event from './events.js'

export default class graphics {
    constructor(game) {
        this._game = game
        this._events = game._events

        this._pixi = new PIXI.Application(
            {
                width: '100',
                height: '100',
                resizeTo: window,
            }
        )

        this._status = {
            loaded: false,
            running: false,            
            gamestate: 0,
        }

    }

    resizePixiRendererToWindowSize() {
        this._pixi.view.width = $(window).width()
        this._pixi.view.height = $(window).height()
    }

    initGraphics() {
        // create dom element
        $('#game-screen').append(this._pixi.view)
        $(this._pixi.view).addClass('m-0')

        // set status
        this._status.loaded = true

        // fire completion event
        this._game._events.fireEvent('graphics-loaded')
    }

    startLoop() {
        // if not loaded
        if(!this._status.loaded) {
            console.log('gameloop cannot be started until game is ready')
            
            this._game._events.once('graphics-loaded', () => {
                this.startLoop()
            })            

            $(() => {
                this.initGraphics()
            })  

            return
        }

        if(this._status.running) {
            console.info('gameloop already running')
            return
        }

        this._pixi.ticker.add((time) => {
            this.loop(time)
        })
    }

    loop(deltatime) {
        console.log(deltatime)
        this._status.running = true
        this._pixi.render()
    }

    setupLoader() {
        // todo: load resources from json (sent by server)
        // and request data straight from server
        this._pixi.loader.add('tiles', './res/tiles.png')
    }
}