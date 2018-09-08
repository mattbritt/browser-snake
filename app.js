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
var Board = require('./gameBoard.js');
var Game = require('./game.js');
var empty = require('is-empty');

const MAX_PLAYERS = 8;          // max players that can connect (needs to be <= to number of colors in game.js)

// set up static route to server client files
app.use('/client', express.static(__dirname + '/client'));

// server client files from / route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/snake.html');
});


// start server
var port = process.argv[2] || 3000;
server.listen(port, ()=>{
    console.log('Browser Snake server up and running on port ' + port);
});

let SOCKET_LIST = {};       // holds sockets of connected players
var game = new Game();      // game object

// handle websockets
io.sockets.on('connection', (socket) => {

    // handle update (move players, etc)
    function handleUpdates(doMove = true){
        if(doMove)
            game.move();
        socket.broadcast.emit('update', game);
    }

    // start timer when 1st player connects
    if(empty(SOCKET_LIST)){
        setInterval(handleUpdates, 250);
    }
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;

    // if there's room for a player add them
    console.log("numplayers, ",game.numPlayers());
    if(game.numPlayers() < MAX_PLAYERS)
      {
        game.addPlayer(socket.id, "name1");

        // remove player on disconnect
        socket.on('disconnect', ()=>{
            game.deletePlayer(socket.id);
            delete SOCKET_LIST[socket.id];
        });

        // handle keypress
        socket.on('keypress', (data)=>{
            if(data && data.hasOwnProperty("direction"))
            {
                var snakeDead = game.moveSnake(socket.id, data.direction);
                if(snakeDead == 'Dead')
                {
                    console.log("-- Snake died");
                    socket.emit('dead', {dead: true});
                }
                //socket.emit('update', game);
                handleUpdates(false);
            }
        });
    }
    // else spectator mode
    else{

    }

    // default message for verification of connection
    var msg = {'msg': "control is an illusion"};
    socket.emit('update', msg);

})