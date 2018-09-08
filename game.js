// game class runs the snake game logic
var board = require('./gameBoard.js');
var snake = require('./snake.js');

const boardX = 50;
const boardY = 37;
const colors = ["blue", "red", "pink", "grey", "white", "black", "brown", "green"];

module.exports = class Game {
    constructor(){
        this.board = new board(boardX, boardY);
        this.Snakes = {};
        this.Players = {};
        this.Food = [];
        this.colorsUsed = {};
    }

    numPlayers(){
        return Object.keys(this.Snakes).length;
    }

    randomColor(){
        var nextColor;
        do{
            nextColor = colors[Math.floor(Math.random() * colors.length)];
            console.log(nextColor);
        }while((nextColor in this.colorsUsed));

        this.colorsUsed[nextColor] = true;
        return nextColor;
    }


    findEmptySpot(){
        // find random, unoccupied spot 
        var x, y;
        do{
            x = Math.floor(Math.random() * boardX);
            y = Math.floor(Math.random() * boardY);
            console.log(y);
        } while(this.board.getSpace(x,y));

        return {'x': x, 'y': y};
    }

    // add player to free spot on board
    addPlayer(id, name){

        if(this.Food.length < 1)
        {
            this.addFood();
        }
    
        var color = this.randomColor();//'red';


        var emptySpot = this.findEmptySpot();
        var x = emptySpot.x;
        var y = emptySpot.y;

        this.board.setSpace(x, y, true);
        console.log(name, x, y, color);
        this.Snakes[id] = new snake(name, x, y, color);
    }

    // delete player when disconnected
    deletePlayer(id){
        if(id in this.Snakes){
            var segments = this.Snakes[id].segmentList;
            for(var i = 0; i < segments.length; i++)
            {
                this.board.setSpace(segments[i].x, segments[i].y, false);
            }
            delete this.colorsUsed[this.Snakes[id].color];
            delete this.Snakes[id];
        }
    }

    moveSnake(id, direction){
        var nextPos = this.Snakes[id].nextPos(direction);

        if(this.board.getSpace(nextPos.x, nextPos.y) != false)
        {
            switch(this.board.getSpace(nextPos.x, nextPos.y))
            {
                case true:
                    this.Snakes[id].direction = null;
                    //this.deletePlayer(id);
                    return 'Dead';
                    break;
                case 'Food':
                    this.Snakes[id].extend(2);
                    this.Food = [];
                    this.addFood();
                    break;
            };
        }
        var tail = this.Snakes[id].getTail();
        this.Snakes[id].moveSnake(direction);
        var head = this.Snakes[id].getHead();
        this.board.setSpace(tail.x, tail.y, false);
        this.board.setSpace(head.x, head.y, true);
    }

    move(){
        for(var snake in this.Snakes){
            //this.Snakes[snake].moveSnake(this.Snakes[snake].direction);
            this.moveSnake(snake, this.Snakes[snake].direction);
        }
    }

    addFood(){
        var emptySpot = this.findEmptySpot();

        this.Food.push(emptySpot);
        this.board.setSpace(emptySpot.x, emptySpot.y, 'Food');
    }
}