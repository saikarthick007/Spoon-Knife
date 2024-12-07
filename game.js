// Get references to DOM elements
const gameBoard = document.getElementById('gameBoard');
const gameMessage = document.getElementById('gameMessage');
const restartButton = document.getElementById('restartButton');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

let currentPlayer = 'X'; // Player X starts
let board = Array(9).fill(null); // The 3x3 grid is represented as a 1D array
let score = { X: 0, O: 0 };

// Generate the game grid dynamically
function createGrid() {
    gameBoard.innerHTML = ''; // Clear any previous game board
    board.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.addEventListener('click', () => handleCellClick(index));
        gameBoard.appendChild(cellDiv);
    });
}

// Handle a player clicking a cell
function handleCellClick(index) {
    if (board[index] || checkWinner()) return; // Ignore if the cell is already marked or game is over

    board[index] = currentPlayer;
    renderBoard();

    if (checkWinner()) {
        gameMessage.textContent = `${currentPlayer} wins!`;
        score[currentPlayer]++;
        updateScoreboard();
    } else if (board.every(cell => cell !== null)) {
        gameMessage.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameMessage.textContent = `It's Player ${currentPlayer}'s turn!`;
    }
}

// Render the board visually
function renderBoard() {
    const cells = gameBoard.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

// Check for a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

// Update the scoreboard
function updateScoreboard() {
    scoreX.textContent = score.X;
    scoreO.textContent = score.O;
}

// Restart the game
restartButton.addEventListener('click', () => {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameMessage.textContent = `It's Player X's turn!`;
    createGrid();
});

createGrid(); // Initialize the game grid
