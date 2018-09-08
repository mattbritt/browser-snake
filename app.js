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
var game = new Game();




// handle websockets
io.sockets.on('connection', (socket) => {


    function handleUpdates(){
        socket.emit('update', game);
    }
    

    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;

    game.addPlayer(socket.id, "name1");

    setInterval(handleUpdates, 250);

    // remove player on disconnect
    socket.on('disconnect', ()=>{
        game.deletePlayer(socket.id);
        delete SOCKET_LIST[socket.id];
    });

    // handle keypress
    socket.on('keypress', (data)=>{
        switch(data.direction)
        {
            case 'up':
                console.log('up');
                break;
            case 'down':
            console.log('down');
                break;
            case 'left':
            console.log('left');
                break;
            case 'right':
            console.log('right');
                break;
        }
        if(data && data.hasOwnProperty("direction"))
        {
            game.moveSnake(socket.id, data.direction);
            socket.emit('update', game);
        }
    });


    var msg = {'msg': "control is an illusion"};
    socket.emit('update', msg);

})