// game class runs the snake game logic
var board = require('./gameBoard.js');
var snake = require('./snake.js');
var fs = require('fs');

const boardX = 50;      // board x size in segments
const boardY = 37;      // board y size in segments
const colors = ["blue", "red", "pink", "grey", "white", "black", "brown", "green"];  // if number players exceeds number colors, server will crash




module.exports = class Game {
    constructor(){
        this.board = new board(boardX, boardY);
        this.Snakes = {};
        this.Food = [];
        this.colorsUsed = {};
        this.PlayerData = {};


        // read existing player data
        // based on code by Zamboney at https://stackoverflow.com/questions/36856232/write-add-data-in-json-file-using-node-js
        fs.readFile('data.json',function(err,content){
            if(!err)
            {
                this.playerData = JSON.parse(content);
            }

          });


    }

    // return number of current players
    numPlayers(){
        return Object.keys(this.Snakes).length;
    }

    // return a random color from list (and take it out of rotation)
    randomColor(){
        var nextColor;
        do{
            nextColor = colors[Math.floor(Math.random() * colors.length)];
        }while((nextColor in this.colorsUsed));

        this.colorsUsed[nextColor] = true;
        return nextColor;
    }

    // return a random, empty spot  -- potential endless loop if all spots occupied
    findEmptySpot(){
        var x, y;
        do{
            x = Math.floor(Math.random() * boardX);
            y = Math.floor(Math.random() * boardY);
        } while(this.board.getSpace(x,y));

        return {'x': x, 'y': y};
    }

    // add player to free spot on board
    addPlayer(id, name){
        console.log(id , name);
        // make sure there's food to eat
        if(this.Food.length < 1)
        {
            this.addFood();
        }
    
        // randomly assign new player a color
        var color = this.randomColor();

        // assign player to random spot
        var emptySpot = this.findEmptySpot();
        var x = emptySpot.x;
        var y = emptySpot.y;

        this.board.setSpace(x, y, true);
        
        // create new snake for player
        this.Snakes[id] = new snake(name, x, y, color);
        console.log(this.Snakes[id]);
    }

    // delete player when disconnected
    deletePlayer(id){
        console.log('delete');
        if(id in this.Snakes){
            // clean up board
            var segments = this.Snakes[id].segmentList;
            for(var i = 0; i < segments.length; i++)
            {
                this.board.setSpace(segments[i].x, segments[i].y, false);
            }

            // return color to rotation
            delete this.colorsUsed[this.Snakes[id].color];

            // remove snake from this.Snakes list
            delete this.Snakes[id];
        }
    }

    checkScore(id){
    
    }

    // move snakes
    moveSnake(id, direction){
        if(id in this.Snakes){
            var nextPos = this.Snakes[id].nextPos(direction);

            if(this.Snakes[id].direction != null && this.board.getSpace(nextPos.x, nextPos.y) != false)
            {
                switch(this.board.getSpace(nextPos.x, nextPos.y))
                {
                    case true:
                    console.log('collision');
                        this.Snakes[id].direction = null;
                        this.deletePlayer(id);
                        console.log('returning dead');
                        return 'Dead';
                        break;
                    case 'Food':
                        this.Snakes[id].extend(2);
                        this.Food = [];
                        this.addFood();
                        this.checkScore(id);
                        break;
                };
            }
            var tail = this.Snakes[id].getTail();
            this.Snakes[id].moveSnake(direction);
            var head = this.Snakes[id].getHead();
            this.board.setSpace(tail.x, tail.y, false);
            this.board.setSpace(head.x, head.y, true);
        }
    }
    move(){
        for(var snake in this.Snakes){
            //this.Snakes[snake].moveSnake(this.Snakes[snake].direction);
            return this.moveSnake(snake, this.Snakes[snake].direction);
        }
    }

    addFood(){
        var emptySpot = this.findEmptySpot();

        this.Food.push(emptySpot);
        this.board.setSpace(emptySpot.x, emptySpot.y, 'Food');
    }
}