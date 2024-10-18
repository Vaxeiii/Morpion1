const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedIndex = clickedCell.getAttribute('data-index');

    if (board[clickedIndex] !== '' || !gameActive) {
        return;
    }

    updateCell(clickedCell, clickedIndex);
    checkWinner();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `C'est le tour de ${currentPlayer}`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} a gagné !`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusText.textContent = "C'est un match nul !";
        gameActive = false;
        return;
    }

    switchPlayer();
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = `C'est le tour de ${currentPlayer}`;
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
