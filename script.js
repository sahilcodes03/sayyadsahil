// Tic Tac Toe Game Logic

class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = {
            X: 0,
            O: 0,
            tie: 0
        };
        
        this.initializeGame();
    }

    initializeGame() {
        this.cells = document.querySelectorAll('.cell');
        this.statusElement = document.getElementById('status');
        this.resetBtn = document.getElementById('resetBtn');
        this.newGameBtn = document.getElementById('newGameBtn');
        
        this.addEventListeners();
        this.updateStatus();
        this.updateScores();
    }

    addEventListeners() {
        // Add click listeners to cells
        this.cells.forEach(cell => {
            cell.addEventListener('click', () => this.handleCellClick(cell));
        });

        // Add button listeners
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.newGameBtn.addEventListener('click', () => this.newGame());
    }

    handleCellClick(cell) {
        const index = parseInt(cell.getAttribute('data-index'));
        
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }

        // Place the mark
        this.board[index] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase(), 'fade-in');

        // Check for win
        if (this.checkWin()) {
            this.handleWin();
            return;
        }

        // Check for tie
        if (this.checkTie()) {
            this.handleTie();
            return;
        }

        // Switch player
        this.switchPlayer();
    }

    checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]) {
                
                // Highlight winning cells
                this.cells[a].classList.add('winning');
                this.cells[b].classList.add('winning');
                this.cells[c].classList.add('winning');
                
                return true;
            }
        }
        return false;
    }

    checkTie() {
        return this.board.every(cell => cell !== '');
    }

    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.updateScores();
        
        this.statusElement.textContent = `Player ${this.currentPlayer} wins!`;
        this.statusElement.className = 'alert alert-success';
        
        setTimeout(() => {
            this.showGameOverModal(`Player ${this.currentPlayer} wins!`);
        }, 1000);
    }

    handleTie() {
        this.gameActive = false;
        this.scores.tie++;
        this.updateScores();
        
        this.statusElement.textContent = "It's a tie!";
        this.statusElement.className = 'alert alert-warning';
        
        setTimeout(() => {
            this.showGameOverModal("It's a tie!");
        }, 1000);
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateStatus();
    }

    updateStatus() {
        this.statusElement.textContent = `Player ${this.currentPlayer}'s turn`;
        this.statusElement.className = 'alert alert-info';
    }

    updateScores() {
        document.getElementById('scoreX').textContent = this.scores.X;
        document.getElementById('scoreO').textContent = this.scores.O;
        document.getElementById('scoreTie').textContent = this.scores.tie;
    }

    resetGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        // Clear cells
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
        
        this.updateStatus();
    }

    newGame() {
        this.scores = { X: 0, O: 0, tie: 0 };
        this.updateScores();
        this.resetGame();
    }

    showGameOverModal(message) {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'game-over';
        overlay.innerHTML = `
            <div class="game-over-content">
                <h3>${message}</h3>
                <p>Would you like to play again?</p>
                <div class="mt-3">
                    <button class="btn btn-primary me-2" onclick="game.resetGame(); this.parentElement.parentElement.parentElement.remove();">
                        Play Again
                    </button>
                    <button class="btn btn-secondary" onclick="this.parentElement.parentElement.parentElement.remove();">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Add click outside to close
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.game = new TicTacToe();
});

// Add some fun sound effects (optional)
function playSound(type) {
    // This is a placeholder for sound effects
    // You can add actual sound files and play them here
    console.log(`Playing ${type} sound`);
}

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
        game.resetGame();
    } else if (e.key === 'n' || e.key === 'N') {
        game.newGame();
    }
});