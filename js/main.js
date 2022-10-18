/*----- constants -----*/

const box = document.querySelector('.container')

const reset = document.querySelector('#resetBtn')

let boxes = document.querySelectorAll(".box")
let spaces = Array(20).fill(null)
/*----- app's state (variables) -----*/



/*----- cached element references -----*/
/*----- event listeners -----*/

box.addEventListener('click', onBoxClicked);


reset.addEventListener('click', onResetClicked);



/*----- functions -----*/

function onBoxClicked (event){
    console.log(event.target)
    event.target.classList.remove('box-back')
}




function onResetClicked (event){
    console.log(event.target)
    event.target.classList.
    
}


console.log("i AM Here");



















function cell(row, column, opened, mined) {
    return {
        id: row + "" + column,
        row: row,
        column: column,
        opened: opened,
        mined: mined,
    }
}

function board(boardSize, mineCount){
        let board = {};
        for(var row = 0; row < boardSize; row++){
                for(var column = 0; column < boardSize; column++){
            board[row + "" + column] = cell(row, column, false, false, false, 0);
        }
    }
    board = randomlyAssignMines( board, mineCount);
    board = calculateNeighborMineCounts( board, boardSize);
    return board;
}



function check(x1, y1) {
    if((x1>=0)&&(y1>0)&&(x1<columns)&&(y1<rows))
    return board[x1+y1*columns];

}

function picture(index){
    return tile[index].src.substr(tile[index].src.length-5,1);
}

function inint(){
    document.getElementById('status').innerHTML=('Click on tiles to reveal them');
    mines = 5;
    rows = 4;
    columns = 5;
    remaining = mines;
    tile = [];
    board = [];
    revealed = 0;
    for (i=0; i<rows*columns; i++){
        tile[i] = document.createElement('img');
        tile[i].src = "x.png";
        tile[i].id = i;
        document.body.appendChild(tile[i]);

    }
}

placed = 0;
do{
    i = math.floor(Math.random()*columns*rows);
    if(board[i]!='mine'){
        board[i] = 'mine';
        placed++;
    }
} while (placed<mines);

for(var x = 0; x<columns; x++)
for(y=0; y<rows+1; y++){
    if(check(x,y)!='mine'){
        board[x+y*columns]=
        ((check(x,y+1)=='mine')|0)
        +((check(x-1,y+1)=='mine')|0)       
        +((check(x+1,y+1)=='mine')|0)       
        +((check(x,y-1)=='mine')|0)        
        +((check(x-1,y-1)=='mine')|0)       
        +((check(x+1,y-1)=='mine')|0)        
        +((check(x-1,y)=='mine')|0)        
        +((check(x+1,y)=='mine')|0);         
        }
   }

   function click (event){
    var source = event.target;
    id = source.id;
    if(event.which==3){
        switch(picture(id)){
            case 'x':
        }
    }
   }