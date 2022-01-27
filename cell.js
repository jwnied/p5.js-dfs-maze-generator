function Cell(i, j){
  this.i = i;
  this.j = j;
  
  this.visited = false;
  
  this.sides = 15; //1111
  //bitmask
  this.TOP = 1;    //0001
  this.RIGHT = 2;  //0010
  this.BOTTOM = 4; //0100
  this.LEFT = 8;   //1000
  
  this.index = function(i,j){
    if(i<0 || j<0 || i>cols-1 || j>rows-1){
      return -1;
    }
    return i + j * cols;
  }
  
  
  
  this.checkNeighbors = function() {
    
    var neighbors = [];
    this.addNeighbor = function(cell){
    if(cell && !cell.visited)
      neighbors.push(cell);
    }
    
    var top    = grid[this.index(i  ,j-1)];
    var right  = grid[this.index(i+1,j  )];
    var bottom = grid[this.index(i  ,j+1)];
    var left   = grid[this.index(i-1,j  )];
    
    this.addNeighbor(top);
    this.addNeighbor(right);
    this.addNeighbor(bottom);
    this.addNeighbor(left);
    
    if(neighbors.length > 0){
      var r = floor(random(neighbors.length));
      
      return neighbors[r];
    }
    return undefined //maybe redundant
  }
  
  
  this.hasSide = function(side){
    return this.sides & side; //bitwise and
  }
  
  this.removeSide = function(side){
    this.sides&=~side; //this masks out the side
  }
  
  this.highlight = function() {
    var x = this.i*scl;
    var y = this.j*scl;
    noStroke();
    fill(255);
    rect(x,y,scl,scl);
  }
  
  this.show = function(){
    var x = this.i*scl;
    var y = this.j*scl;
    stroke(255);
    
    if(this.hasSide(this.TOP)){
      line(x,y,x+scl,y);         //top
    }
    if(this.hasSide(this.RIGHT)){
      line(x+scl,y,x+scl,y+scl); //right
    }
    if(this.hasSide(this.BOTTOM)){
      line(x+scl,y+scl,x,y+scl); //bottom
    }
    if(this.hasSide(this.LEFT)){
      line(x,y+scl,x,y);         //left
    }
    if(this.visited){
      noStroke();
      fill(105,155,255);
      rect(x,y,scl,scl);
    }
  }
}