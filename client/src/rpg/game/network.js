import {io} from 'socket.io-client'
import log from '../lib/logger.js'

export default class network {
    constructor(game) {
        this._game = game;
        this._socket = io("ws://172.30.120.2:1337")
        this.setupInputBuffer()        
    }

    setupInputBuffer() {
        this._inputBuffer = []
        this._socket.onAny((...data) => {
            this.handleDataPacket(...data)
        })
    }

    sendData(...data) {
        this._socket.emit('d', {
            time: Date.now(),
            ...data
        })
        log(3, 'data sent', ...data)

    }

    handleDataPacket(...data) {
        this._inputBuffer.push({
            time_rec: Date.now(),
            ...data
        })
        log(3, 'data recieved and stored', this._inputBuffer.length)        
    }
}