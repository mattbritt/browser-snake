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
        this.size = 1;
        this.x = x;
        this.y = y;
        this.color = color;
        this.ctx = ctx;
    }

    // drawSegment draws an individual snake segment
    // x and y are in units of the grid
    drawSegment(x,y){
        ctx.rect(x * segmentSize, y * segmentSize, segmentSize, segmentSize);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
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

let s1 = new Snake("s1", 50, 75, 'pink', ctx);

s1.drawSegment(5,5);


