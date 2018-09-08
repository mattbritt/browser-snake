// game class runs the snake game logic
var board = require('./gameBoard.js');
var snake = require('./snake.js');

const boardX = 25;
const boardY = 37;

module.exports = class Game {
    constructor(){
        this.board = new board(boardX, boardY);
        this.Snakes = {};
        this.Players = {};
    }


    // add player to free spot on board
    addPlayer(id, name){
    
        var color = 'red';
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

}