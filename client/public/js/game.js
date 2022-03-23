document.getElementById('loginbutton').addEventListener("click", (event) => {
    socket.emit('d', 'ICH WILL MICH EINLOGGEN!', document.getElementById('loginname').value)
})

const game = new PIXI.Application();
document.body.appendChild(game.view);

const socket = io("ws://172.30.120.2:1337");


game.ticker.add(() => {

})