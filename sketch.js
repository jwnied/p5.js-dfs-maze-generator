var cols,rows;
var scl = 10;
var grid = [];

var current;

var stack = [];

function setup() {
  createCanvas(400, 400);
  cols = floor(width/scl);
  rows = floor(height/scl);
  
  for(var j =0; j<rows; j++){
    for(var i=0;i<cols; i++){
      var cell = new Cell(i,j);
      grid.push(cell);
    }
  }
  
  current = grid[0];
}

function draw() {
  background(45);
  for(var i=0;i<grid.length;i++){
    grid[i].show();
  }
  current.visited = true;
  current.highlight();
  // STEP 1
  var next = current.checkNeighbors();
  if(next) {
    next.visited = true;
    // STEP 2
    stack.push(current);
    // STEP 3
    removeWalls(current, next);
    // STEP 4
    current = next;
  } 
  else if(stack.length >0) {
    // rest of STEP 2
    current = stack.pop();
  }
}
function removeWalls(a,b){
  var x = a.i - b.i;
  var y = a.j - b.j;
  if(x === 1){
    a.removeSide(a.LEFT);
    b.removeSide(b.RIGHT);
  }
  else if(x === -1){
    a.removeSide(a.RIGHT);
    b.removeSide(b.LEFT);
  }
  else if(y === 1){
    a.removeSide(a.TOP);
    b.removeSide(b.BOTTOM);
  }
  else if(y === -1){
    a.removeSide(a.BOTTOM);
    b.removeSide(b.TOP);
  }
}