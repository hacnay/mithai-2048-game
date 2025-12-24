# 🍬 Mithai Merge Mania

A delightful 2048-style puzzle game with an Indian sweets theme! Merge colorful mithai tiles to reach higher numbers and achieve the ultimate sweet victory.

![Game Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🎮 Features

### Core Gameplay
- **Classic 2048 Mechanics**: Slide tiles in four directions (up, down, left, right)
- **Indian Sweets Theme**: Beautiful mithai-themed tiles with vibrant colors
- **Smooth Animations**: Fluid tile movements and merge effects with particle effects
- **Touch & Keyboard Controls**: Play on mobile or desktop
- **Multiple Board Sizes**: 3×3 (Easy), 4×4 (Normal), 5×5 (Hard)

### 🎯 Game Modes
- **Classic Mode**: Traditional 2048 gameplay - reach 2048 to win
- **Time Mode**: Race against the clock - score as much as possible in 60 seconds
- **Endless Mode**: Continue playing after reaching 2048
- **Target Mode**: Reach a specific tile within 50 moves

### ⚡ Power-ups & Features
- **Undo System**: Go back 1-3 moves per game (3 undos available)
- **Hint System**: Shows the best next move with visual indicator
- **Shuffle**: Randomly rearrange all tiles on the board
- **Remove Tile**: Click to delete one tile from the board
- **Freeze**: Prevents new tiles from spawning for 3 moves
- **Double Merge**: Next merge counts double points

### 🎨 Customization
- **4 Visual Themes**:
  - ☀️ Light (default)
  - 🌙 Dark mode
  - 🌈 Colorful (animated gradient)
  - 🎨 Classic (warm tones)
- **Theme Selector**: Easy switching between themes
- **Settings Panel**: Accessible via gear icon (⚙️)

### 🔊 Audio & Effects
- **Sound Effects**: 
  - Merge sounds (pitch varies with tile value)
  - Move sounds
  - Achievement fanfare
- **Background Music**: Optional Indian-style melody
- **Audio Controls**: Toggle sounds and music independently
- **Particle Effects**: Colorful particles burst on merges
- **Confetti Celebrations**: Confetti on achievements and milestones

### 🎯 Game Features
- ✨ **Combo Bonus System**: Earn 30% bonus score for each additional merge in a single move
- 🏆 **Best Score Tracking**: Your personal best is saved and displayed
- 📊 **Move Counter**: Track your efficiency with move statistics
- 🎯 **Daily Challenges**: Complete daily objectives for extra rewards
- 💡 **Sweet Facts**: Learn interesting facts about Indian sweets as you play
- 📈 **Leaderboard**: Compete for the top scores

### 🎬 User Experience
- **Loading Screen**: Animated text filling effect
- **Onboarding**: Interactive tutorial for first-time users
- **Help/FAQ**: Comprehensive in-game help section
- **Error Handling**: User-friendly error messages with toast notifications
- **Smooth Transitions**: Beautiful state transitions throughout the game

### UI/UX Highlights
- 🎨 **Modern Design**: Beautiful gradient backgrounds and glassmorphism effects
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop
- 🌈 **Smooth Animations**: Fade-in, pop-in, pulse, shimmer, and tile sliding effects
- 🎭 **Visual Feedback**: Shake animation for invalid moves, bonus indicators
- 🔔 **Achievement Notifications**: Celebrate your milestones with confetti
- 🎪 **Particle System**: Dynamic particle effects on merges and achievements

### Mobile Optimizations
- 📱 **Touch-Optimized**: Smooth touch controls with gesture support
- 🔒 **Screen Lock**: Portrait orientation lock for better gameplay
- 🚫 **Scroll Prevention**: No accidental scrolling during gameplay
- ⚡ **Performance**: Optimized for mobile devices

## 🚀 Getting Started

### Web Version
1. Simply open `Game.html` in your web browser
2. Or use a local server:
   ```bash
   npx live-server --open=Game.html
   ```
3. Or use Python:
   ```bash
   python -m http.server 8000
   # Then open http://localhost:8000/Game.html
   ```

## 🎯 How to Play

1. **Use Arrow Keys** (desktop) or **Swipe** (mobile) to move tiles
2. **Merge identical tiles** by sliding them together
3. **Reach higher numbers** by combining tiles strategically
4. **Use Power-ups** strategically (Undo, Hint, Shuffle, etc.)
5. **Earn combo bonuses** by making multiple merges in one move
6. **Beat your best score** and climb the leaderboard!

### Controls
- **Desktop**: Arrow keys (↑ ↓ ← →) or WASD
- **Mobile**: Swipe in any direction
- **Restart**: Click the "New Game" button
- **Settings**: Click the gear icon (⚙️) in the top-left corner
- **Help**: Access via Settings → Help & FAQ

### Power-ups Guide
- **Undo (↶)**: Revert your last move (3 uses per game)
- **Hint (💡)**: See the best next move with visual indicator
- **Shuffle (🔀)**: Randomly rearrange all tiles
- **Remove (🗑️)**: Click a tile to remove it
- **Freeze (❄️)**: Stop new tiles for 3 moves
- **Double (2×)**: Next merge scores double points

## 🎨 Game Mechanics

### Scoring System
- **Base Score**: Sum of merged tile values
- **Combo Bonus**: 30% bonus per additional merge in a single move
- **Double Merge**: 2× multiplier when power-up is active
- **Example**: Merging 3 pairs = Base score + 60% bonus

### Tile Values
- Start with tiles of value 2
- Each merge doubles the value (2 → 4 → 8 → 16 → ...)
- Goal: Reach the highest possible tile!

### Game Modes Explained
- **Classic**: Standard 2048 - reach 2048 (Thali) to win
- **Time**: 60-second timer - score as much as possible
- **Endless**: Continue playing after reaching 2048
- **Target**: Reach a specific tile (256, 512, 1024, or 2048) within 50 moves

### Game Over
- Game ends when the board is full and no moves are possible
- Your score is saved automatically
- Challenge yourself to beat your best!

## 🛠️ Technologies Used

- **HTML5**: Game structure
- **CSS3**: Modern styling with animations, themes, and responsive design
- **JavaScript**: Game logic, audio system, particle effects, and interactivity
- **Web Audio API**: Sound effects and background music
- **Canvas API**: Particle effects and confetti
- **LocalStorage**: Save game state, scores, and preferences

## 📁 Project Structure

```
.
├── Game.html              # Main game file
├── README.md              # This file
├── package.json           # Node.js dependencies (optional)
├── css/
│   └── style.css          # All styles and themes
└── js/
    ├── game.js            # Main game logic
    ├── audio.js           # Sound effects and music
    ├── particles.js       # Particle effects system
    ├── themes.js          # Theme management
    ├── loading.js         # Loading screen manager
    ├── error-handler.js   # Error handling system
    ├── onboarding.js     # First-time user tutorial
    └── help.js            # Help/FAQ modal
```

## 🎮 Game Improvements

### Latest Updates (v2.0)
- ✅ **Undo Feature**: 1-3 undos per game
- ✅ **Hint System**: Shows best next move
- ✅ **Board Sizes**: 3×3, 4×4, 5×5 options
- ✅ **Power-ups**: Shuffle, Remove, Freeze, Double merge
- ✅ **Game Modes**: Classic, Time, Endless, Target
- ✅ **Sound Effects**: Merge, move, and achievement sounds
- ✅ **Background Music**: Optional Indian-style melody
- ✅ **Particle Effects**: Particles on merges
- ✅ **Confetti Celebrations**: On achievements and milestones
- ✅ **Dark Mode**: Alternative color scheme
- ✅ **Theme Selector**: 4 visual themes
- ✅ **Loading Screen**: Animated text filling effect
- ✅ **Error Handling**: User-friendly error messages
- ✅ **Onboarding**: First-time user tutorial
- ✅ **Help/FAQ**: Comprehensive in-game help
- ✅ **Smooth Transitions**: Better state transitions

### Previous Updates
- ✅ Fixed challenge progress tracking bug
- ✅ Added best score display
- ✅ Implemented invalid move feedback (shake animation)
- ✅ Added combo bonus system with visual indicators
- ✅ Improved score calculation with multipliers
- ✅ Enhanced mobile responsiveness
- ✅ Added frosted glass bonus indicator

## 🎨 Customization

### Themes
Access the settings panel (⚙️) to switch between:
- **Light**: Default bright theme
- **Dark**: Dark mode for low-light environments
- **Colorful**: Animated gradient background
- **Classic**: Warm, traditional color scheme

### Audio Settings
- Toggle sound effects on/off
- Toggle background music on/off
- Preferences saved automatically

## 🤝 Contributing

This is an open source game created for everyone to enjoy! Contributions are welcome:
- Report bugs
- Suggest new features
- Submit pull requests
- Share feedback
- Fork and modify as you like

## 📝 License

This project is **completely open source** and available under the MIT License.

### 🎮 Free to Use & Enjoy

**No copying restrictions - just enjoy!** 

This game is free and open for everyone. Feel free to:
- ✅ Play and enjoy the game
- ✅ Share it with friends
- ✅ Fork and modify the code
- ✅ Use it for learning purposes
- ✅ Deploy it anywhere you want
- ✅ Create your own version

The only thing we ask is that you have fun! 🎉

## 👨‍💻 Author

**Subhang**

- 🔗 [GitHub](https://github.com/hacnay)
- 💼 [LinkedIn](https://www.linkedin.com/in/hacnay/)

## 🙏 Acknowledgments

- Inspired by the classic 2048 game
- Indian sweets theme for cultural celebration
- Built with love for puzzle game enthusiasts

---

**Enjoy playing Mithai Merge Mania! 🍬🎮**
