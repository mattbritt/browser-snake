/*

    Browser Snake - Browser Back End
    Authors: Matt Britt, Alex Cheng, Brooks Przybylek
    Date: 9/7/2018
    Description: 
        This is the js file for the Browser Snake server.


    Acknowledgements:


*/


// imports
const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
var snake = require('./snake.js');

// set up static route to server client files
app.use('/client', express.static(__dirname + '/client'));

// server client files from / route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/snake', (req, res) => {
    res.sendFile(__dirname + '/client/snake.html');
})

// start server
var port = process.argv[2] || 3000;
server.listen(port, () => {
    console.log('Browser Snake server up and running on port ' + port);
});

const SOCKET_LIST = {};       // holds sockets of connected players
const PLAYER_LIST = {};       // holds snake objects of connected players
const GAMES = {
    gameList: [],
    numGames: 0
};

// handle websockets
io.sockets.on('connection', (socket) => {
    console.log('hello');
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;

    //    let player = new snake(socket.id.toString(), 

    // remove player on disconnect
    socket.on('disconnect', () => {
        console.log('disconnected');
        delete SOCKET_LIST[socket.id];
    });

    // handle keypress
    socket.on('keypress', (data) => {
        switch (data.direction) {
            case 'up':
                break;
            case 'down':
                break;
            case 'left':
                break;
            case 'right':
                break;
        }
    });

    var msg = { 'msg': "control is an illusion" };
    socket.emit('update', msg);

    socket.on('createGame', (gameName) => {

        const game = { players: {} };
        game.players[socket.id] = socket;
        game.gameName = gameName;
        game.gameId = (Math.random() + 1).toString(36).slice(2, 18);
        GAMES.gameList.push(game);
        GAMES.numGames++;
        socket.join(game.gameId);
        console.log(GAMES);
    })
    socket.on('joinGame', (gameId) => {
        console.log('joining');
        socket.room = gameId;
        socket.join(socket.room);
        console.log(socket.rooms);
        io.sockets.in(socket.room).emit('joined', socket.id);
    })

    socket.on('emitting', id => {
        io.sockets.in(socket.room).emit('joined', socket.id);
        // Object.keys(socket.rooms).forEach(room => {
        //     io.of('/').in(room).clients((err, clients) => {
        //         console.log(room);
        //         console.log(clients);
        //         io.sockets.in(room).emit('joined', 'sdfd');
        //     })
        // })
    })

})