// snake class represents an individual snake
module.exports = class Snake {
    constructor(name, x, y, color){
        this.name = name;
        this.score = 0;
        this.segmentList = [{'x':x, 'y':y}];
        this.x = x;                 // head x position (in grid units)
        this.y = y;                 // head y position (in grid units)
        this.color = color;
        //this.ctx = ctx;
        this.direction = null;
        this.extending = 0;
    }

    /*
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
*/

    // extend snake given # segments
    extend(num){
        this.extending = num;
    }

    // add new snake segment
    addSegment(x, y){
        this.segmentList.push({'x': x, 'y': y});
    }

    // remove tail segment
    removeTail(){
        this.segmentList.splice(0,1);
    }

    // return tail segment coords
    getTail(){
        return {'x': this.segmentList[0].x, 'y': this.segmentList[0].y};
    }

    // return head segments coords
    getHead(){
        var lastSeg = this.segmentList.length - 1;
        return {'x': this.segmentList[lastSeg].x, 'y': this.segmentList[lastSeg].y};
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
            
            if(this.extending > 0){
                this.extending--;
            }
            else{
                this.removeTail();
            }
        }
    }

    nextPos(dir){

        var nextX = this.x;
        var nextY = this.y;

        switch(dir){

            case 'up':
                nextY--;
                break;
            case 'down':
                nextY++;
                break;
            case 'left':
                nextX--;
                break;
            case 'right':
                nextX++;
                break;
        }

        return {'x': nextX, 'y': nextY};
    }
};