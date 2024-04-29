const cells = document.querySelectorAll(".boxAlign");
const retry_btn = document.querySelector("#again");
const statusDisplay = document.querySelector("#status");
const onePlayerBtn = document.querySelector("#one-player");
const twoPlayersBtn = document.querySelector("#two-players");
const winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let playerOne = "X";
let playerTwo = "O";
let currentPlayer = playerOne;
let isOnePlayerMode = false;
let running = false;

initializeGame();

function initializeGame(){
    onePlayerBtn.addEventListener("click", () => {
        isOnePlayerMode = true;
        startGame();
    });
    twoPlayersBtn.addEventListener("click", () => {
        isOnePlayerMode = false;
        startGame();
    });

    onePlayerBtn.style.display = "inline-block";
    twoPlayersBtn.style.display = "inline-block";
}

function startGame() {
    onePlayerBtn.style.display = "none";
    twoPlayersBtn.style.display = "none";

    document.querySelector('.grid').style.display = 'grid';

    currentPlayer = playerOne; 
    statusDisplay.textContent = `${currentPlayer}'s turn`;
    statusDisplay.style.display = "block"; 
    statusDisplay.style.fontSize = "20px"; 
    cells.forEach(cell => {
        cell.addEventListener("click", cellClicked);
        cell.textContent = "";
    });
    retry_btn.style.display = "none";
    running = true;
}



function cellClicked(){
    const cellIndex = this.getAttribute("boxAlignIndex");

    if(options[cellIndex] !== "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
    if (isOnePlayerMode && currentPlayer === playerTwo && running) {
        setTimeout(() => {
            computerMove();
        }, 500); // Delay the computer move 
        }
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
    statusDisplay.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winCondition.length; i++) {
        const condition = winCondition[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }

        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        alert(`${currentPlayer} Wins`);
        running = false;
        showPlayAgainButton();
    } else if (!options.includes("") && running) {
        alert(`Draw!`);
        running = false;
        showPlayAgainButton();
    } else {
        changePlayer();
    }
}

function computerMove() {
    let emptyCells = [];
    for (let i = 0; i < options.length; i++) {
        if (options[i] === "") {
            emptyCells.push(i);
        }
    }
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cellIndex = emptyCells[randomIndex];
    const cell = cells[cellIndex];
    updateCell(cell, cellIndex);
    checkWinner();
}

function showPlayAgainButton() {
    retry_btn.style.display = "block";
}

retry_btn.addEventListener("click", restartGame);

function restartGame(){
    currentPlayer = playerOne;
    options = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.textContent = `${currentPlayer}'s turn`;
    statusDisplay.style.display = "none"; 
    cells.forEach(cell => cell.textContent = "");
    retry_btn.style.display = "none";
    running = true;

    isOnePlayerMode = false;

    document.querySelector('.grid').style.display = 'none';
    retry_btn.style.display = 'none';

    onePlayerBtn.style.display = "inline-block";
    twoPlayersBtn.style.display = "inline-block";
}