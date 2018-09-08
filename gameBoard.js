// board class implements the grid that the snake game is played on
// unit-less dimensions are used (grid is in terms of snake segments)

// spaces make up individual spaces
class Space{
    constructor(){
        this.occupied = false;
    }

    setOccupied(occ){
        this.occupied = occ;
    }

    getOccupied(){ return this.occupied;}

}

// Create2DArray from Philippe Leybaert
// https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
function Create2DArray(rows) {
    var arr = [];
  
    for (var i=0;i<rows;i++) {
       arr[i] = [];
    }
  
    return arr;
  }

  // create a 2D board array of Spaces
  function createBoardArray(x, y){
      var arr = [];

      for(var i = 0; i < x; i++)
      {
          arr.push([]);
          
          for(var j = 0; j < y; j++)
          {
              arr[i].push(new Space());
          }
      }
      return arr;
  }

// board represents the game board in memory
module.exports = class Board {
    constructor(x, y){
        this.maxX = x;
        this.maxY = y;
        this.board = createBoardArray(this.maxX, this.maxY);
    }

    // return space occupied status
    getSpace(x, y){
        if(x < 0 || y < 0 || x >= this.maxX || y >= this.maxY)
            return true;

        return this.board[x][y].getOccupied();
    }

    setSpace(x,y, val){
        if(x < 0 || y < 0 || x >= this.maxX || y >= this.maxY)
        return;

        this.board[x][y].setOccupied(val);
    }
}