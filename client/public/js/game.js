const app = new PIXI.Application();
document.body.appendChild(app.view);

/*
app.loader.add('bunny', 'bunny.png').load((loader, resources) => {
    const bunny = new PIXI.Sprite(resources.bunny.texture);

    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;

    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    app.stage.addChild(bunny);

    app.ticker.add(() => {
        bunny.rotation += 0.01;
    });
});
*/
const socket = io("ws://localhost:1337");

// send a message to the server
socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

// receive a message from the server
socket.on("hello from server", (...args) => {
  console.log('hahaha')
});


// establish connection
// load map, textures
// sync with gameserver

// capture mouse/keyboard
// loop

/*
app.ticker.add(() => {
})*/