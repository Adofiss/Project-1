/*----- constants -----*/
//create grid, define bomb character,
const components = {
    num_of_rows: 10,
    num_of_columns: 10,
    num_of_bombs: 30,
    bomb: '💣',
    alive: true,
}
// create table and place bombs
function startGame() {
    components.bombs = placeBombs();
    document.getElementById('layout').appendChild(createTable());
}

//run loop to place bombs box by box

function placeBombs() {
    let i, rows = [];

    for (i = 0; i < components.num_of_bombs; i++) {
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

    for (i = 0; i < components.num_of_rows; i++) {
        row = document.createElement('tr');
        for (j = 0; j < components.num_of_columns; j++) {
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
    td.addEventListener('mousedown', function (event) {
        if (!components.alive) {
            return;
        }
        components.mousewhiches += event.which;
        if (event.which === 3) {
            return;
        }
        this.style.backgroundColor = 'hotpink';
    });

    td.addEventListener('mouseup', function (event) {

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

    td.oncontextmenu = function () {
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

    } else {
        cell.stle.color = 'hotpink';
        cell.textContent = components;
        gameWon();

    }
}


function gameOver() {
    components.alive = false;
    document.getElementById('lost').style.display = "block";

}

function gameWon() {
    components.alive = true;
    document.getElementById('won').style.display = "block";

}

function reload() {
    window.location.reload();
}


// start game when page loads

window.addEventListener('load', function () {
    document.getElementById('lost').style.display = "none";
    startGame();
});

// add timer

window.onload = () => {
    let hour = 0;
    let minute = 0;
    let seconds = 0;
    let totalSeconds = 0;

    let intervalId = null;

    intervalId = setInterval(startTimer, 1000);
    function startTimer() {
        ++totalSeconds;
        hour = Math.floor(totalSeconds / 3600);
        minute = Math.floor((totalSeconds - hour * 3600) / 60);
        seconds = totalSeconds - (hour * 3600 + minute * 60);

        document.getElementById("hour").innerHTML = `${hour}:`;
        document.getElementById("minute").innerHTML = `${minute}:`;
        document.getElementById("seconds").innerHTML = seconds;
    }



    document.getElementById('Displplaytimetaken').addEventListener('click', () => {
        document.getElementById("timetaken").innerHTML = minute + "minutes" + seconds + "seconds";
        reset();
    });

    function reset() {
        totalSeconds = 0;
        document.getElementById("hour").innerHTML = '0';
        document.getElementById("minute").innerHTML = '0';
        document.getElementById("seconds").innerHTML = '0';
    }

}