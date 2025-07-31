// Tic Tac Toe Game Logic

class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = { X: 0, O: 0 };
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        this.initializeGame();
    }

    initializeGame() {
        this.bindEvents();
        this.updateGameStatus();
        this.loadScores();
    }

    bindEvents() {
        // Game board events
        const cells = document.querySelectorAll('.game-cell');
        cells.forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e));
        });

        // Button events
        document.getElementById('resetGame').addEventListener('click', () => this.resetGame());
        document.getElementById('resetScore').addEventListener('click', () => this.resetScore());

        // Keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleCellClick(event) {
        const cell = event.target;
        const cellIndex = parseInt(cell.dataset.cell);

        if (!this.gameActive || this.board[cellIndex] !== '') {
            return;
        }

        this.makeMove(cellIndex, cell);
    }

    handleKeyPress(event) {
        // Allow keyboard navigation (1-9 keys for cells)
        if (event.key >= '1' && event.key <= '9') {
            const cellIndex = parseInt(event.key) - 1;
            const cell = document.querySelector(`[data-cell="${cellIndex}"]`);
            
            if (cell && this.gameActive && this.board[cellIndex] === '') {
                this.makeMove(cellIndex, cell);
            }
        }
        
        // R key for reset
        if (event.key.toLowerCase() === 'r') {
            this.resetGame();
        }
    }

    makeMove(index, cellElement) {
        // Update board state
        this.board[index] = this.currentPlayer;
        
        // Update cell display with animation
        cellElement.textContent = this.currentPlayer;
        cellElement.classList.add(this.currentPlayer.toLowerCase());
        cellElement.classList.add('disabled');

        // Check for win or tie
        if (this.checkWin()) {
            this.handleWin();
        } else if (this.checkTie()) {
            this.handleTie();
        } else {
            this.switchPlayer();
        }
    }

    checkWin() {
        return this.winningCombinations.some(combination => {
            const [a, b, c] = combination;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.winningCombination = combination;
                return true;
            }
            return false;
        });
    }

    checkTie() {
        return this.board.every(cell => cell !== '');
    }

    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.updateScoreDisplay();
        this.saveScores();
        this.highlightWinningCells();
        this.updateGameStatus(`🎉 Player ${this.currentPlayer} Wins!`, 'success');
        this.disableAllCells();
        this.celebrateWin();
    }

    handleTie() {
        this.gameActive = false;
        this.updateGameStatus("🤝 It's a Tie!", 'warning');
        this.disableAllCells();
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateGameStatus();
    }

    highlightWinningCells() {
        if (this.winningCombination) {
            this.winningCombination.forEach(index => {
                const cell = document.querySelector(`[data-cell="${index}"]`);
                cell.classList.add('winning');
            });
        }
    }

    celebrateWin() {
        // Add celebration animation
        setTimeout(() => {
            const gameStatus = document.getElementById('gameStatus');
            gameStatus.style.animation = 'pulse 0.6s ease-in-out 3';
        }, 100);
    }

    disableAllCells() {
        const cells = document.querySelectorAll('.game-cell');
        cells.forEach(cell => {
            cell.classList.add('disabled');
        });
    }

    updateGameStatus(message = null, type = 'info') {
        const gameStatus = document.getElementById('gameStatus');
        const statusText = gameStatus.querySelector('h5');
        
        if (message) {
            statusText.textContent = message;
        } else {
            statusText.textContent = `Player ${this.currentPlayer}'s Turn`;
        }

        // Update alert styling
        gameStatus.className = `alert alert-${type}`;
        
        // Add animation
        gameStatus.style.animation = 'none';
        gameStatus.offsetHeight; // Trigger reflow
        gameStatus.style.animation = 'fadeIn 0.5s ease';
    }

    updateScoreDisplay() {
        document.getElementById('scoreX').textContent = this.scores.X;
        document.getElementById('scoreO').textContent = this.scores.O;
        
        // Add score update animation
        const scoreElement = document.getElementById(`score${this.currentPlayer}`);
        scoreElement.style.animation = 'pulse 0.6s ease';
        setTimeout(() => {
            scoreElement.style.animation = '';
        }, 600);
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.winningCombination = null;

        // Clear all cells
        const cells = document.querySelectorAll('.game-cell');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'game-cell';
        });

        this.updateGameStatus();
        
        // Add reset animation
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.style.animation = 'slideIn 0.5s ease';
        setTimeout(() => {
            gameBoard.style.animation = '';
        }, 500);
    }

    resetScore() {
        this.scores = { X: 0, O: 0 };
        this.updateScoreDisplay();
        this.saveScores();
        
        // Show reset confirmation
        const gameStatus = document.getElementById('gameStatus');
        const originalMessage = gameStatus.querySelector('h5').textContent;
        this.updateGameStatus('📊 Scores Reset!', 'info');
        
        setTimeout(() => {
            if (this.gameActive) {
                this.updateGameStatus();
            }
        }, 2000);
    }

    saveScores() {
        localStorage.setItem('ticTacToeScores', JSON.stringify(this.scores));
    }

    loadScores() {
        const savedScores = localStorage.getItem('ticTacToeScores');
        if (savedScores) {
            this.scores = JSON.parse(savedScores);
            this.updateScoreDisplay();
        }
    }

    // AI Player (Optional feature for single player mode)
    makeAIMove() {
        if (!this.gameActive || this.currentPlayer !== 'O') return;

        // Simple AI strategy: try to win, block player, or take center/corner
        let move = this.findWinningMove('O') || 
                  this.findWinningMove('X') || 
                  this.findStrategicMove();

        if (move !== null) {
            const cell = document.querySelector(`[data-cell="${move}"]`);
            setTimeout(() => {
                this.makeMove(move, cell);
            }, 500); // Add slight delay for better UX
        }
    }

    findWinningMove(player) {
        for (let combination of this.winningCombinations) {
            const [a, b, c] = combination;
            const values = [this.board[a], this.board[b], this.board[c]];
            
            if (values.filter(val => val === player).length === 2 && 
                values.filter(val => val === '').length === 1) {
                return combination[values.indexOf('')];
            }
        }
        return null;
    }

    findStrategicMove() {
        // Priority: center, corners, then sides
        const strategicMoves = [4, 0, 2, 6, 8, 1, 3, 5, 7];
        
        for (let move of strategicMoves) {
            if (this.board[move] === '') {
                return move;
            }
        }
        return null;
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new TicTacToe();
    
    // Add some visual feedback for page load
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Add keyboard shortcuts info (optional)
    console.log('🎮 Keyboard shortcuts:');
    console.log('• Use keys 1-9 to place moves');
    console.log('• Press R to reset game');
});

// Add some fun console messages
console.log('🎯 Tic Tac Toe Game Loaded!');
console.log('💡 Tip: Try the keyboard shortcuts for faster gameplay!');