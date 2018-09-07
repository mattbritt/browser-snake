/*

    Browser Snake - Browser Front End
    Authors: Matt Britt, Alex Cheng, Brooks Przybylek
    Date: 9/7/2018
    Description: 
        This is the js file for the Browser Snake front-end.


    Acknowledgements:
        1. Snake code largely based on that of Maria Cristina Di Termine at http://www.competa.com/blog/how-to-build-a-snake-game-using-javascript-and-html5-canvas/


*/ 
// snake segment size (will be square)
var segmentSize = 20;

// canvas size in pixels (creates grid of snake squares)
var canvasHeight = 25 * segmentSize;
var canvasWidth = 37 * segmentSize;

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


    // move snake in a direction
    moveSnake(dir){
        
        // change head position
        switch(dir){
            case 'up':
                this.y--;
                break;
            
            case 'down':
                this.y++;
                break;

            case 'left':
                this.x--;
                break;
            
            case 'right':
                this.x++;
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

let s1 = new Snake("s1", 5, 7, 'pink', ctx);

s1.addSegment(1,1);
s1.addSegment(1,2);

s1.drawSnake();

s1.moveSnake('up');
s1.moveSnake('left');
s1.moveSnake('down');
s1.moveSnake('right');


