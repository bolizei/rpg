
import {sha256} from './lib/crypto.js'


let logged = false;
const socket = io("ws://172.30.120.2:1337");

// NEXT STEP: refactor client
// build encapsulated gameclasses
// integrate pixi
// build html interface where its needed
// session/cookie logic

if(!logged) {
    // hide game, show login
    $('#login').css('display','block')
    $('#main').css('display','none')

    // attach functionality to login form
    $('#loginBtn').click(() => {
        // send logindata to server
        // but only send hash of pw
        socket.emit('l', {
            'name': $("#loginName").val(), 
            'hash': sha256($("#loginPass").val())
        })
    })

    $('#registerBtn').click(() => {
        // check if username and password are filled out
        if($('#loginName').val() == '' || $('#loginPass').val() == '') {
            $('#modalerror').modal('show')
            $('#mdl-message').text('Fill out all fields')
            return
        } 


        // else we send data to server and wait for response
        socket.emit('r', {
            'name': $("#loginName").val(), 
            'hash': sha256($("#loginPass").val())
        })

        // show waiting modal
        $("#modalwaiting").modal({
            backdrop: 'static',
            keyboard: false
        }).show()
    })

    // when login succeeds
    socket.on('d', (data) => {
        if(data.action == 'login') {
            if(data.success) {
                // hide login screen
                $('#modalwaiting').modal('hide').hide()
                $('#modalerror').modal('hide').hide()
                $('#login').hide()
                $('#main').show()

                // start game
                const game = new PIXI.Application();
                $('#main').append(game.view)
                logged = true
            } else {
                $('#modalerror').modal('show')
                $('#mdl-message').text('Login failed')
            }
        } else if(data.action == 'register') {
            $('#modalwaiting').modal('hide')
            $('#modalerror').modal('hide').hide()
            if(data.success) {
                $('#modalerror').modal('show')
                $('#mdl-message').text('Register failed successfully :D:D:D')
            } else {
                $('#modalerror').modal('show')
                $('#mdl-message').text('Register failed')

            }
        }
    })
} 

export default {}