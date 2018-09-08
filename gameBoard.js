// board class implements the grid that the snake game is played on
// unit-less dimensions are used (grid is in terms of snake segments)

class Space{
    constructor(){
        this.occupied = false;
    }

    setOccupied(occ){
        this.occupied = occ;
    }

    getOccupied(){ return this.occupied;}

}


module.exports = class Board {
    constructor(x, y){
        this.maxX = x;
        this.maxY = y;
        this.board = new Space[this.maxX][this.maxY];
    }
}