// Tic Tac Toe game logic

// Get DOM elements
const cells = document.querySelectorAll('[data-index]');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

// Game variables
let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
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
  const cell = e.target;
  const index = parseInt(cell.dataset.index, 10);

  if (!gameActive || board[index] !== '') {
    return; // Ignore if game over or cell already filled
  }

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (board.every(v => v !== '')) {
    statusText.textContent = 'Draw!';
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return (
      board[a] === currentPlayer &&
      board[b] === currentPlayer &&
      board[c] === currentPlayer
    );
  });
}

function resetGame() {
  board.fill('');
  cells.forEach(cell => (cell.textContent = ''));
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Attach event listeners
afterDOMLoaded();

function afterDOMLoaded() {
  // Ensure the cells are available in DOM before adding listeners
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  resetBtn.addEventListener('click', resetGame);
}