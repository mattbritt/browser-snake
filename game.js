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
        this.colorsUsed = {};
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


    // add player to free spot on board
    addPlayer(id, name){
    
        var color = this.randomColor();//'red';
        var x, y;

        // find random, unoccupied spot for new player
        do{
            x = Math.floor(Math.random() * boardX);
            y = Math.floor(Math.random() * boardY);
            console.log(y);
        } while(this.board.getSpace(x,y));

        this.board.setSpace(x, y, true);
        this.Snakes[id] = (new snake(name, x, y, color));
    }

    // delete player when disconnected
    deletePlayer(id){
        delete this.colorsUsed[this.Snakes[id].color];
        delete this.Snakes[id];
    }
}