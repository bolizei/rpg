import player from './player.js'
import level from './level.js'
import settings from './settings.js'
import logger from './logger.js'
import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import mysql from 'mysql'

const log = new logger()

export default class gameserver {
    constructor() {
        this.setupNetwork()
        this.setupDatabase()
        this.players = []
        this.levels = []
    }


    setupDatabase() {
        log.log(0, 'connecting to database')
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'rpg'
        })
        this.connection.connect((error) => {
            if(error)
                log.log(0, 'error white connecting', error)
            else {
                log.log(0, 'database connection established')
            }
        })
    }

    setupNetwork() {        
        log.log(0, 'starting gameserver')
        this.app = express()
        log.log(0, 'starting webserver')
        this.httpserver = http.createServer(this.app)
        this.socketserver = new Server(this.httpserver, {
            cors: {
                origin: 'http://172.30.120.2:3000'
            }
        })
        this.httpserver.listen(settings.listen_port, () => {
            log.log(0, 'web server is listening on', settings.listen_port)
        })
        this.setupNetworkHandlers()
    }

    setupNetworkHandlers() {
        this.socketserver.on('connection', (socket) => {
            this.connectPlayer(socket)
        })
    }

    connectPlayer(socket) {
        log.log(0, 'player connected')
        let newplayer = new player('name', socket)
        newplayer.connected = true            
        this.addPlayer(newplayer)
        this.setupPlayerNetworkHandlers(newplayer)    
    }

    setupPlayerNetworkHandlers(player) {
        log.log(0, 'setting up network handlers for player', player.socket.id)
        player.socket.on('d', (...data) => {
            log.log(-1, 'data',  player.socket.id, ...data)
        })
        player.socket.on('r', (...data) => {
            log.log(-1, 'request',  player.socket.id, ...data)
        })
        player.socket.on('u', (...data) => {
            log.log(-1, 'update',  player.socket.id, ...data)
        })       
        player.socket.on('disconnect', (...data) => {
            log.log(-1, 'disonnect',  player.socket.id, ...data)
            this.removePlayerFromPool(player)
            //this.getPlayerBySocket(player.socket).connected = false
        })       
    }


    getPlayerBySocket(socket) {
        for(const p in this.players) 
            if(this.players[p].socket.id === socket.id) 
                return this.players[p]
        return null
    }

    removePlayerFromPool(playerToRemove) {
        let i = this.players.indexOf(playerToRemove)
        if(i < 0)
            return                
        this.players.splice(i, 1)
        log.log(0, 'removing player from pool', playerToRemove.socket.id, 'pool size ', this.players.length) 
    }

    addPlayer(newplayer) {
        this.players.push(newplayer)
        log.log(0, 'adding new player to the pool', newplayer.socket.id, 'pool size ', this.players.length)        
    }

    addLevel(name) {
        this.levels.push(new level(name))
    }
}

