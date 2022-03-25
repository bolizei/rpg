import * as PIXI from 'pixi.js'
import $ from 'jquery'

export default class graphics {
    constructor(game) {
        this._game = game
        this._pixi = new PIXI.Application(
            {
                width: $(document).width(),
                height: $(document).height()
            }
        )

        // wait for DOM to be loaded
        $(() => {
            this.initGraphics()
        })
    }

    resizePixiRendererToWindowSize() {
        this._pixi.renderer.view.width = $(window).width()
        this._pixi.renderer.view.height = $(window).height()
    }

    initGraphics() {
        // create dom element
        $('#game-screen').append(this._pixi.view)
        $(this._pixi.view).addClass('m-0')
        // add resize event listener
        $(window).on('resize', (event) => {
            this.resizePixiRendererToWindowSize()
        })

        // load resources
        this.loadResources()

    }

    loadResources() {
        
    }
}