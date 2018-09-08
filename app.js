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


// set up static route to server client files
app.use('/client', express.static(__dirname + '/client'));

// server client files from / route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/snake.html');
});


var port = process.argv[2] || 3000;
server.listen(port, ()=>{
    console.log('Browser Snake server up and running on port ' + port);
});