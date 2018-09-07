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

/*******************************************************************/ 
// snake class represents an individual snake
class Snake {
    constructor(name, x, y, color, ctx){
        this.name = name;
        this.segmentList = [{'x':x, 'y':y}];
        this.x = x;                 // head x position (in grid units)
        this.y = y;                 // head y position (in grid units)
        this.color = color;
        this.ctx = ctx;
        this.direction = null;
    }

    // drawSegment draws an individual snake segment
    // x and y are in units of the grid
    drawSegment(x,y){
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
        delete this.segmentList[0];
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

        this.drawSnake();
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

// init game on load
window.onload = function(){
    startTimer();
}

// start the game (and timer)
function startTimer()
{
    setInterval(updateGame, timeInterval);
}

// update each step of the game
function updateGame()
{
    snakes.forEach(snake => {
        snake.moveSnake(snake.getDir());
        snake.drawSnake();
    });
}

snakes[0].moveSnake('right');


