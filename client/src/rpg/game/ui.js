import $ from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class webui {
    constructor(game) {
        this._game = game

        this._webframes = {}

        $(() => { 
            //this.buildUI()
        })
    }

    buildUI() {
        let build = $('<div>').attr('id', 'login-screen')
        build.add('<div>').text('')



        this._webframes.login = build

        build = $('<div>').attr('id', 'game-screen')
        build.add('p').text('test2')
        this._webframes.game = build

        for(let frame in this._webframes) {
            console.log(frame, this._webframes[frame])
            $('body').append(this._webframes[frame])
        }        
    }


}