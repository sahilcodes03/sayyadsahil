# Tic Tac Toe Game

A modern, responsive tic-tac-toe game built with HTML, CSS, JavaScript, and Bootstrap.

## Features

- **Modern UI**: Beautiful gradient design with Bootstrap components
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Score Tracking**: Persistent score tracking with localStorage
- **Animations**: Smooth animations and visual feedback
- **Keyboard Support**: Use number keys 1-9 to make moves
- **Touch Support**: Optimized for touch devices
- **Auto-restart**: Games automatically restart after completion
- **Winning Highlights**: Winning combinations are highlighted

## How to Play

1. **Start the Game**: Open `index.html` in your web browser
2. **Make Moves**: Click on any empty cell to place your mark (X or O)
3. **Win Conditions**: Get three of your marks in a row (horizontally, vertically, or diagonally)
4. **Keyboard Shortcuts**:
   - Numbers 1-9: Make moves in corresponding cells
   - R key: Restart the current game

## Game Controls

- **New Game**: Start a fresh game (keeps scores)
- **Reset Scores**: Clear all score tracking

## Technical Details

### Files Structure
```
├── index.html      # Main HTML structure
├── styles.css      # Custom CSS styling
├── script.js       # Game logic and functionality
└── README.md       # This documentation
```

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with animations
- **JavaScript ES6+**: Game logic with classes
- **Bootstrap 5**: Responsive framework
- **Font Awesome**: Icons
- **localStorage**: Score persistence

### Features Breakdown

#### Game Logic
- Turn-based gameplay
- Win detection for all 8 possible combinations
- Draw detection
- Score tracking with persistence

#### UI/UX Features
- Responsive grid layout
- Hover effects and animations
- Color-coded players (X: Blue, O: Red)
- Winning cell highlighting
- Status messages with Bootstrap alerts

#### Responsive Design
- Mobile-first approach
- Adaptive game board size
- Touch-friendly interactions
- Optimized for all screen sizes

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Local Development

1. Clone or download the files
2. Open `index.html` in your web browser
3. No build process required - pure HTML/CSS/JS

## Customization

### Colors
Modify the CSS variables in `styles.css`:
```css
.bg-gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Game Board Size
Adjust the game board dimensions in `styles.css`:
```css
.game-board {
    width: 300px;
    height: 300px;
}
```

### Animations
Customize animation durations and effects in the CSS file.

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests!

---

Enjoy playing Tic Tac Toe! 🎮 
