const express = require('express');
const app = express();
const http = require('http');
const HTTPserver = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(HTTPserver, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

HTTPserver.listen(1337, () => {
    console.log('listening on *:3000 sdsd');
});