/*

    Browser Snake - Browser Front End
    Authors: Matt Britt, Alex Cheng, Brooks Przybylek
    Date: 9/7/2018
    Description: 
        This is the js file for the Browser Snake front-end.


    Acknowledgements:


*/ 

var segmentSize = 20;           // snake segment size (will be square)
var width = 25;                 // board width (in snake segments)
var height = 37;                // board height (in snake segments)

var timeInterval = 200;         // timer interval in ms

// canvas size in pixels (creates grid of snake squares)
var canvasHeight = width * segmentSize;
var canvasWidth = height * segmentSize;

// instantiate socket
let socket = io();

var gameData = {};              // will hold game state

/*******************************************************************/ 
// snake class represents an individual snake
// snake class represents an individual snake
class Snake {
    constructor(name, x, y, color){
        this.name = name;
        this.segmentList = [{'x':x, 'y':y}];
        this.x = x;                 // head x position (in grid units)
        this.y = y;                 // head y position (in grid units)
        this.color = color;
        this.ctx = ctx;
        this.direction = null;
    }

    // set the context to player's context
    setContext(ctx){
        this.ctx = ctx;
    }
    // drawSegment draws an individual snake segment
    // x and y are in units of the grid
    drawSegment(x,y){
        ctx.beginPath();
        ctx.rect(x * segmentSize, y * segmentSize, segmentSize, segmentSize);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }

    // draw snake draws the entire snake
    drawSnake(){

        this.segmentList.forEach((seg)=>{
            this.drawSegment(seg.x, seg.y);
        })
    }

    // add new snake segment
    addSegment(x, y){
        this.segmentList.push({'x': x, 'y': y});
    }

    // remove tail segment
    removeTail(){
        this.segmentList.splice(0,1);
    }

    // get snake direction
    getDir(){ return this.direction;}

    // move snake in a direction
    moveSnake(dir){
        
        // change head position
        switch(dir){
            case 'up':
                this.y--;
                this.direction = 'up';
                break;
            
            case 'down':
                this.y++;
                this.direction = 'down';
                break;

            case 'left':
                this.x--;
                this.direction = 'left';
                break;
            
            case 'right':
                this.x++;
                this.direction = 'right';
                break;
        }

        // we won't add segments to non-moving snake
        if(dir != null)
        {
            this.addSegment(this.x, this.y);
            this.removeTail();
        }
    }
}

/*******************************************************************/

// get canvas
var canvas = document.getElementById("canvas");

// set canvas attributes
canvas.setAttribute("height", canvasHeight);
canvas.setAttribute("width", canvasWidth);

// get context
var ctx = canvas.getContext('2d');

// array of player snakes
var snakes = [];
snakes.push(new Snake("s1", 5, 7, 'blue', ctx));
snakes.push(new Snake("nother snake", 20, 20, 'pink',ctx));

// init game on load
window.onload = function(){
    document.addEventListener('keydown', handleKeypress);
    startTimer();
}

// start the game (and timer)
function startTimer()
{
    setInterval(updateGame, timeInterval);
}

    // drawSegment draws an individual snake segment
    // x and y are in units of the grid
function drawSegment(x,y, color){
        ctx.beginPath();
        ctx.rect(x * segmentSize, y * segmentSize, segmentSize, segmentSize);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
    }

function drawSnake(snake){
    for(var segment in snake.segmentList){
        var x = snake.segmentList[segment].x;
        var y = snake.segmentList[segment].y;

        drawSegment(x, y, snake.color);
    }
}

// update each step of the game
function updateGame(data = null)
{
    if(data === null) return;
if(data.hasOwnProperty("board")){
    width = data.board.maxX;
    height = data.board.maxY;
    canvasWidth = segmentSize * width;
    canvasHeight = segmentSize * height;
}
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
   
if(data.hasOwnProperty("Snakes")){
    // update snakes
 /*   data.Snakes.forEach(snake => {
        snake.moveSnake(snake.getDir());
        snake.drawSnake();
    });*/
    for(var snake in data.Snakes){
        drawSnake(data.Snakes[snake]);
    }
}
}

// handle keypresses
function handleKeypress(event)
{
    switch(event.code){
        case 'ArrowUp':
            //snakes[0].moveSnake('up');
            socket.emit("keypress", {direction: 'up'});
            break;
        case 'ArrowDown':
            //snakes[0].moveSnake('down');
            socket.emit("keypress", {direction: 'down'});
            break;
        case 'ArrowLeft':
            //snakes[0].moveSnake('left');
            socket.emit("keypress", {direction: 'left'});
            break;
        case 'ArrowRight':
            //snakes[0].moveSnake('right');
            socket.emit("keypress", {direction: 'right'});
            break;
    }
 //   updateGame();
}


socket.on('update', (data)=>{
    gameData = data;
    console.log('updated game data');
    console.log(data);
    updateGame(data);
});