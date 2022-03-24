import game from './game.js'
import * as PIXI from 'pixi.js'
import $ from 'jquery'
import {io} from 'socket.io-client'

const gamex = new PIXI.Application();

const socket = io("ws://172.30.120.2:1337");

socket.emit('d', 'test')
$('body').add('div').attr('id', 'main')
$('#main').append(gamex.view)


let rpg = new game('nanana')
//game.run()