// Query Selectors //

var tableRow = document.getElementsByTagName('tr');
var tableCell = document.getElementsByTagName('td');
var tableSlot = document.querySelectorAll('.slot');
const playerTurn = document.querySelector('.player-turn');
const reset = document.querySelector('.reset');

// Table coordinates to be logged when clicked by players. //

for(let i = 0; i < tableCell.length; i++) {
    tableCell[i].addEventListener('click', (e) => {
    console.log(`${e.target.parentElement.rowIndex}`, `${e.target.cellIndex}`);
 })

}

 // Game Logic //

// Player 1 input and game piece. //

while(!player1) {
    var player1 = prompt('Player One: Enter your name. You will be red.');
}

player1Color = 'red';

// Player 2 input and game piece. // 

while(!player2) {
    var player2 = prompt('Player Two: Enter your name. You will be blue.');
}

player2Color = 'blue';

// For Current Player //

var currentPlayer = 1;
playerTurn.textContent = `${player1}'s turn!`;

// Sets cell iteration and changes background color from default (white) on user (player) click. //

Array.prototype.forEach.call(tableCell, (cell) => {
    cell.addEventListener('click', changeColor);
    cell.style.backgroundColor = 'white';
    });


// Changes color of cell on user click that corresponds to table coordinates. //

function changeColor(e) {
    let column = e.target.cellIndex;
    let row = [];

    for(let i = 5; i > -1; i--) {

        if(tableRow[i].children[column].style.backgroundColor == 'white') {
            row.push(tableRow[i].children[column]);

            if(currentPlayer === 1) {
                row[0].style.backgroundColor = player1Color;

                // Win checks for Player 1. //

                if(horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()) {
                    playerTurn.textContent = `${player1} wins!`;
                    playerTurn.style.color = player1Color;
                    return (alert(`${player1} WINS!`));

                } else if(drawCheck()) {
                    playerTurn.textContent = 'Game is a draw!';
                    return alert('DRAW!');

                } else {

                playerTurn.textContent = `${player2}'s turn!`;
                return currentPlayer = 2;
                }

            } else {

                row[0].style.backgroundColor = player2Color;
                playerTurn.textContent = `${player1}'s turn!`;

                // Win checks for Player 2. //

                if(horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()) {
                    playerTurn.textContent = `${player2} wins!`;
                    playerTurn.style.color = player2Color;
                    return (alert(`${player2} WINS!`));

                } else if(drawCheck()) {
                    playerTurn.textContent = 'Game is a draw!';
                    return alert('DRAW!');

                } else {

                playerTurn.textContent = `${player1}'s turn!`;
                return currentPlayer = 1;
            }
        }       
    }
}

// Win Checks //

// Checks the color match for Player Wins. //

function colorMatchCheck(one, two, three, four) {
    return(one == two && one === three && one === four && one !== 'white');
}

// Horizontal Check //

function horizontalCheck() {

    for(let row = 0; row < tableRow.length; row++) {

        for(let col = 0; col < 4; col++) {

            if(colorMatchCheck(tableRow[row].children[col].style.backgroundColor, 
                tableRow[row].children[col+1].style.backgroundColor, 
                tableRow[row].children[col+2].style.backgroundColor, 
                tableRow[row].children[col+3].style.backgroundColor)) {
                    return true;
                }  
        }
    }
}

// Vertical Check //

function verticalCheck() {

    for(let col = 0; col < 7; col++) {

        for(let row = 0; row < 3; row++) {

            if(colorMatchCheck(tableRow[row].children[col].style.backgroundColor, 
                tableRow[row+1].children[col].style.backgroundColor, 
                tableRow[row+2].children[col].style.backgroundColor, 
                tableRow[row+3].children[col].style.backgroundColor)) {
                    return true;
                }
        }
    }
}

// Diagonal Check - Left to Right //

function diagonalCheck1() {

    for(let col =0; col < 4; col++) {

        for(row = 0; row < 3; row++) {

            if(colorMatchCheck(tableRow[row].children[col].style.backgroundColor, 
                tableRow[row+1].children[col+1].style.backgroundColor, 
                tableRow[row+2].children[col+2].style.backgroundColor, 
                tableRow[row+3].children[col+3].style.backgroundColor)) {
                    return true;
                }
        }
    }
}

// Diagonal Check - Right to Left //

function diagonalCheck2() {

    for(let col =0; col < 4; col++) {

        for(row = 5; row > 2; row--) {

            if(colorMatchCheck(tableRow[row].children[col].style.backgroundColor, 
                tableRow[row-1].children[col+1].style.backgroundColor, 
                tableRow[row-2].children[col+2].style.backgroundColor, 
                tableRow[row-3].children[col+3].style.backgroundColor)) {
                    return true;
                }
        }
    }
}

// Draw Check - No Winner //

function drawCheck() {

    let fullSlot = [];

    for(let i = 0; i > tableCell.length; i++) {

        if(tableCell[i].style.backgroundColor !== 'white') {
            fullSlot.push(tableCell[i]);
        }
    }

        if(fullSlot.length === tableCell.length) {
            return true;
        }
}
}

// Game Reset //

reset.addEventListener('click', ()=> {

    tableSlot.forEach(slot => {
        slot.style.backgroundColor = 'white';
    });

    playerTurn.style.color = 'black';
    return currentPlayer === 1 ? playerTurn.textContent = `${player1}'s turn` : playerTurn.textContent = `${player2}'s turn`;
    });


