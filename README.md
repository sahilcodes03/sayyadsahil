# Tic Tac Toe Game

A modern, responsive tic-tac-toe game built with HTML, CSS, JavaScript, and Bootstrap.

## Features

- **Modern UI**: Beautiful gradient background and clean design
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Gameplay**: Smooth animations and hover effects
- **Score Tracking**: Keeps track of wins for both players and ties
- **Game Controls**: Reset current game or start a new game with fresh scores
- **Win Detection**: Automatically detects wins and highlights winning combinations
- **Game Over Modal**: Elegant popup when game ends
- **Keyboard Support**: Press 'R' to reset game, 'N' for new game

## How to Play

1. **Start the Game**: Open `index.html` in your web browser
2. **Take Turns**: Players X and O take turns clicking on empty cells
3. **Win Conditions**: Get three of your marks in a row (horizontally, vertically, or diagonally)
4. **Game Controls**:
   - **Reset Game**: Clears the current board and starts over
   - **New Game**: Resets both the board and the score counter
5. **Keyboard Shortcuts**:
   - Press 'R' to reset the current game
   - Press 'N' to start a new game (resets scores)

## Game Rules

- Player X always goes first
- Players take turns placing their mark (X or O) in empty cells
- The first player to get three marks in a row wins
- If all cells are filled without a winner, the game is a tie
- Winning combinations are highlighted with a pulsing animation

## Technical Details

### Files Structure
```
├── index.html      # Main HTML structure
├── styles.css      # Custom CSS styling
├── script.js       # Game logic and JavaScript functionality
└── README.md       # This file
```

### Technologies Used
- **HTML5**: Semantic structure and game board layout
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)**: Object-oriented game logic with classes
- **Bootstrap 5**: Responsive grid system and UI components

### Key Features
- **Object-Oriented Design**: Clean, maintainable code structure
- **Event-Driven Architecture**: Responsive to user interactions
- **CSS Animations**: Smooth transitions and visual feedback
- **Mobile-First Design**: Optimized for all screen sizes
- **Accessibility**: Keyboard navigation and clear visual feedback

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Getting Started

1. Download all files to a folder
2. Open `index.html` in your web browser
3. Start playing!

No server setup required - this is a pure client-side application.

## Customization

You can easily customize the game by:
- Changing colors in `styles.css`
- Modifying game logic in `script.js`
- Adding sound effects (see the `playSound` function in `script.js`)
- Adjusting animations and timing

## Future Enhancements

- Sound effects for moves and wins
- AI opponent
- Different board sizes
- Tournament mode
- Local storage for persistent scores 
