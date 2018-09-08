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
    res.sendFile(__dirname + '/client/snake.html');
});


// start server
var port = process.argv[2] || 3000;
server.listen(port, ()=>{
    console.log('Browser Snake server up and running on port ' + port);
});

let SOCKET_LIST = {};       // holds sockets of connected players
let PLAYER_LIST = {};       // holds snake objects of connected players


// handle websockets
io.sockets.on('connection', (socket) => {
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;

    //    let player = new snake(socket.id.toString(), 

    // remove player on disconnect
    socket.on('disconnect', ()=>{
        delete SOCKET_LIST[socket.id];
    });

    // handle keypress
    socket.on('keypress', (data)=>{
        switch(data.direction)
        {
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


    var msg = {'msg': "control is an illusion"};
    socket.emit('update', msg);

})