// snake class represents an individual snake
module.exports = class Snake {
    constructor(name, x, y, color){
        this.name = name;
        this.segmentList = [{'x':x, 'y':y}];
        this.x = x;                 // head x position (in grid units)
        this.y = y;                 // head y position (in grid units)
        this.color = color;
        //this.ctx = ctx;
        this.direction = null;
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
    }
};