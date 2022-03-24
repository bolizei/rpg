import $ from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class ui {
    constructor(game) {
        this.game = game
        this.buildUI()
    }

    buildUI() {
        $('body').add('p').text('test')
    }
}