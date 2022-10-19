/*----- constants -----*/
//create grid, define bomb character,
const components = {
    num_of_rows : 3,
    num_of_columns : 3,
    num_of_bombs : 1,
    bomb : '💣',
    alive : true,
}
// create table and place bombs
function startGame() {
    components.bombs = placeBombs();
    document.getElementById('layout').appendChild(createTable());
}

//run loop to place bombs box by box

function placeBombs() {
    let i, rows = [];
    
    for (i=0; i<components.num_of_bombs; i++) {
        placeSingleBomb(rows);
    }
    return rows;
} 

// randomize bomb placement by using Math.random

function placeSingleBomb(bombs) {

    let nrow, ncol, row, col;
    nrow = Math.floor(Math.random() * components.num_of_rows);
    ncol = Math.floor(Math.random() * components.num_of_columns);
    row = bombs[nrow];
    
    if (!row) {
        row = [];
        bombs[nrow] = row;
    }
    
    col = row[ncol];
    
    if (!col) {
        row[ncol] = true;
        return
    } 
    else {
        placeSingleBomb(bombs);
    }
}

// run loop to create table according to initial dictionary

function cellID(i, j) {
    return 'cell-' + i + '-' + j;
}

function createTable() {
    let table, row, td, i, j;
    table = document.createElement('table');
    
    for (i=0; i<components.num_of_rows; i++) {
        row = document.createElement('tr');
        for (j=0; j<components.num_of_columns; j++) {
            td = document.createElement('td');
            td.id = cellID(i, j);
            row.appendChild(td);
            addCellListeners(td, i, j);
        }
        table.appendChild(row);
    }
    return table;
}

function addCellListeners(td, i, j) {
    td.addEventListener('mousedown', function(event) {
        if (!components.alive) {
            return;
        }
        components.mousewhiches += event.which;
        if (event.which === 3) {
            return;
        }
        this.style.backgroundColor = 'hotpink';
    });

    td.addEventListener('mouseup', function(event) {
      
        if (!components.alive) {
            return;
        }


        components.mousewhiches = 0;
        
        if (event.which === 3) {
           
            if (this.clicked) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();
          
            return false;
        } 
        else {
            handleCellClick(this, i, j);
        }
    });

    td.oncontextmenu = function() { 
        return false; 
    };
}

//using if/else statements define how game reacts (bomb or no bomb)

function handleCellClick(cell, i, j) {
    if (!components.alive) {
        return;
    }


    cell.clicked = true;

    if (components.bombs[i][j]) {
        cell.style.color = 'red';
        cell.textContent = components.bomb;
        gameOver();
        
    }
}


function gameOver() {
    components.alive = false;
    document.getElementById('lost').style.display="block";
    
}

function reload(){
    window.location.reload();
}


// start game when page loads

window.addEventListener('load', function() {
    document.getElementById('lost').style.display="none";
    startGame();
});