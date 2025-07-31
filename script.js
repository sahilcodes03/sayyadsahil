// Tic Tac Toe Game Logic

class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = {
            X: 0,
            O: 0,
            ties: 0
        };
        
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells = document.querySelectorAll('.cell');
        this.statusElement = document.getElementById('status');
        this.restartBtn = document.getElementById('restart-btn');
        this.resetScoresBtn = document.getElementById('reset-scores-btn');
        this.gameBoard = document.getElementById('game-board');
        
        this.loadScores();
        this.updateScoreDisplay();
        this.addEventListeners();
        this.updateStatus();
    }
    
    addEventListeners() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e));
        });
        
        this.restartBtn.addEventListener('click', () => this.restartGame());
        this.resetScoresBtn.addEventListener('click', () => this.resetScores());
    }
    
    handleCellClick(e) {
        const cell = e.target;
        const cellIndex = parseInt(cell.getAttribute('data-cell-index'));
        
        if (this.board[cellIndex] !== '' || !this.gameActive) {
            return;
        }
        
        this.makeMove(cellIndex);
    }
    
    makeMove(cellIndex) {
        this.board[cellIndex] = this.currentPlayer;
        this.cells[cellIndex].textContent = this.currentPlayer;
        this.cells[cellIndex].classList.add(this.currentPlayer.toLowerCase());
        
        // Add animation class
        this.cells[cellIndex].style.animation = 'pulse 0.3s ease-in-out';
        setTimeout(() => {
            this.cells[cellIndex].style.animation = '';
        }, 300);
        
        if (this.checkWin()) {
            this.handleGameEnd('win');
        } else if (this.checkDraw()) {
            this.handleGameEnd('draw');
        } else {
            this.switchPlayer();
            this.updateStatus();
        }
    }
    
    checkWin() {
        for (let combination of this.winningCombinations) {
            const [a, b, c] = combination;
            if (this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]) {
                this.highlightWinningCells(combination);
                return true;
            }
        }
        return false;
    }
    
    highlightWinningCells(combination) {
        combination.forEach(index => {
            this.cells[index].classList.add('winning');
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    handleGameEnd(result) {
        this.gameActive = false;
        this.gameBoard.classList.add('game-over');
        
        if (result === 'win') {
            this.scores[this.currentPlayer]++;
            this.updateStatus(`Player ${this.currentPlayer} wins!`);
            this.statusElement.className = 'alert alert-success text-center';
        } else {
            this.scores.ties++;
            this.updateStatus("It's a draw!");
            this.statusElement.className = 'alert alert-warning text-center';
        }
        
        this.saveScores();
        this.updateScoreDisplay();
        
        // Auto-restart after 2 seconds
        setTimeout(() => {
            this.restartGame();
        }, 2000);
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
    
    updateStatus(message = null) {
        if (!message) {
            message = `Player ${this.currentPlayer}'s turn`;
        }
        this.statusElement.textContent = message;
    }
    
    restartGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning');
        });
        
        this.gameBoard.classList.remove('game-over');
        this.statusElement.className = 'alert alert-info text-center';
        this.updateStatus();
    }
    
    resetScores() {
        this.scores = { X: 0, O: 0, ties: 0 };
        this.saveScores();
        this.updateScoreDisplay();
        
        // Show confirmation
        this.statusElement.className = 'alert alert-info text-center';
        this.updateStatus('Scores reset!');
        
        setTimeout(() => {
            this.updateStatus();
        }, 1500);
    }
    
    updateScoreDisplay() {
        document.getElementById('score-x').textContent = this.scores.X;
        document.getElementById('score-o').textContent = this.scores.O;
        document.getElementById('score-ties').textContent = this.scores.ties;
    }
    
    saveScores() {
        localStorage.setItem('ticTacToeScores', JSON.stringify(this.scores));
    }
    
    loadScores() {
        const savedScores = localStorage.getItem('ticTacToeScores');
        if (savedScores) {
            this.scores = JSON.parse(savedScores);
        }
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});

// Add some additional features

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '9') {
        const cellIndex = parseInt(e.key) - 1;
        const cell = document.querySelector(`[data-cell-index="${cellIndex}"]`);
        if (cell && cell.textContent === '') {
            cell.click();
        }
    }
    
    if (e.key === 'r' || e.key === 'R') {
        document.getElementById('restart-btn').click();
    }
});

// Add touch feedback for mobile devices
document.addEventListener('touchstart', (e) => {
    if (e.target.classList.contains('cell')) {
        e.target.style.transform = 'scale(0.95)';
    }
});

document.addEventListener('touchend', (e) => {
    if (e.target.classList.contains('cell')) {
        e.target.style.transform = '';
    }
});

// Add confetti effect for wins (optional enhancement)
function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Add CSS for confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(confettiStyle);