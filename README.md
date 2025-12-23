# 🍬 Mithai Merge Mania

A delightful 2048-style puzzle game with an Indian sweets theme! Merge colorful mithai tiles to reach higher numbers and achieve the ultimate sweet victory.

![Game Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🎮 Features

### Core Gameplay
- **Classic 2048 Mechanics**: Slide tiles in four directions (up, down, left, right)
- **Indian Sweets Theme**: Beautiful mithai-themed tiles with vibrant colors
- **Smooth Animations**: Fluid tile movements and merge effects
- **Touch & Keyboard Controls**: Play on mobile or desktop

### Game Features
- ✨ **Combo Bonus System**: Earn 30% bonus score for each additional merge in a single move
- 🏆 **Best Score Tracking**: Your personal best is saved and displayed
- 📊 **Move Counter**: Track your efficiency with move statistics
- 🎯 **Daily Challenges**: Complete daily objectives for extra rewards
- 💡 **Sweet Facts**: Learn interesting facts about Indian sweets as you play
- 📈 **Leaderboard**: Compete for the top scores

### UI/UX Highlights
- 🎨 **Modern Design**: Beautiful gradient backgrounds and glassmorphism effects
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop
- 🌈 **Smooth Animations**: Fade-in, pop-in, pulse, and shimmer effects
- 🎭 **Visual Feedback**: Shake animation for invalid moves, bonus indicators
- 🔔 **Achievement Notifications**: Celebrate your milestones

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

### Android App (Cordova)
The project includes a Cordova setup for building Android APK:

```bash
cd mithai-2048
npm install
cordova platform add android
cordova build android
```

## 🎯 How to Play

1. **Use Arrow Keys** (desktop) or **Swipe** (mobile) to move tiles
2. **Merge identical tiles** by sliding them together
3. **Reach higher numbers** by combining tiles strategically
4. **Earn combo bonuses** by making multiple merges in one move
5. **Beat your best score** and climb the leaderboard!

### Controls
- **Desktop**: Arrow keys (↑ ↓ ← →) or WASD
- **Mobile**: Swipe in any direction
- **Restart**: Click the "New Game" button

## 🎨 Game Mechanics

### Scoring System
- **Base Score**: Sum of merged tile values
- **Combo Bonus**: 30% bonus per additional merge in a single move
- **Example**: Merging 3 pairs = Base score + 60% bonus

### Tile Values
- Start with tiles of value 2
- Each merge doubles the value (2 → 4 → 8 → 16 → ...)
- Goal: Reach the highest possible tile!

### Game Over
- Game ends when the board is full and no moves are possible
- Your score is saved automatically
- Challenge yourself to beat your best!

## 🛠️ Technologies Used

- **HTML5**: Game structure
- **CSS3**: Modern styling with animations and responsive design
- **JavaScript**: Game logic and interactivity
- **Cordova**: Mobile app framework (for Android build)
- **Google Fonts**: Poppins font family

## 📁 Project Structure

```
.
├── Game.html              # Main game file (all-in-one)
├── README.md              # This file
├── package.json           # Node.js dependencies
└── mithai-2048/          # Cordova project
    ├── config.xml         # Cordova configuration
    ├── www/              # Web assets
    └── platforms/        # Platform-specific builds
```

## 🎮 Game Improvements

### Recent Updates
- ✅ Fixed challenge progress tracking bug
- ✅ Removed duplicate function definitions
- ✅ Added best score display
- ✅ Implemented invalid move feedback (shake animation)
- ✅ Added combo bonus system with visual indicators
- ✅ Improved score calculation with multipliers
- ✅ Enhanced mobile responsiveness
- ✅ Added frosted glass bonus indicator

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

