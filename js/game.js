const mithaiNames = {
  2: 'Boondi', 4: 'Motichoor', 8: 'Barfi', 16: 'Kaju Katli',
  32: 'Rasgulla', 64: 'Gulab Jamun', 128: 'Rasmalai',
  256: 'Jalebi', 512: 'Ghewar', 1024: 'Gulkand', 2048: 'Thali'
};

const mithaiColors = {
  2: 'linear-gradient(135deg, #fbeec1 0%, #f3d250 100%)',
  4: 'linear-gradient(135deg, #f3d250 0%, #f0b64c 100%)',
  8: 'linear-gradient(135deg, #f0b64c 0%, #ec9f4a 100%)',
  16: 'linear-gradient(135deg, #ec9f4a 0%, #e27d60 100%)',
  32: 'linear-gradient(135deg, #e27d60 0%, #c38d9e 100%)',
  64: 'linear-gradient(135deg, #c38d9e 0%, #85cdca 100%)',
  128: 'linear-gradient(135deg, #85cdca 0%, #41b3a3 100%)',
  256: 'linear-gradient(135deg, #41b3a3 0%, #e8a87c 100%)',
  512: 'linear-gradient(135deg, #e8a87c 0%, #c38d9e 100%)',
  1024: 'linear-gradient(135deg, #c38d9e 0%, #8ee4af 100%)',
  2048: 'linear-gradient(135deg, #8ee4af 0%, #4ecdc4 100%)'
};

const sweetFacts = [
  "Boondi is made from chickpea flour and is a crucial ingredient in making both sweet and savory ladoos.",
  "Motichoor laddoos are famous for their tiny, delicate boondi pearls, often prepared during special occasions like weddings and festivals.",
  "Barfi is a soft, milk-based sweet that comes in various flavors like chocolate, pistachio, and mango.",
  "Kaju Katli, one of India's most popular sweets, is made by blending cashew nuts with sugar syrup and cardamom, creating a smooth, melt-in-your-mouth texture.",
  "Rasgulla, originally from Bengal, is made from chhena (cottage cheese) and soaked in a light, sugary syrup, creating a spongy, soft dessert.",
  "Gulab Jamun is made from milk solids and flour, deep-fried, and then soaked in a fragrant sugar syrup flavored with rose water or cardamom.",
  "Rasmalai is a creamy dessert made from soft white cream and chhena, flavored with cardamom and saffron, often served chilled.",
  "Jalebi, a crispy, syrupy treat, is made by deep-frying a batter in circular shapes and then soaking it in sugar syrup, making it crispy on the outside and soft on the inside.",
  "Ghewar is a delicate, honeycomb-like dessert from Rajasthan, often served during Teej or Raksha Bandhan festivals. It is soaked in sugar syrup and topped with dry fruits.",
  "Gulkand, a sweet preserve of rose petals and sugar, is not only delicious but is believed to have cooling properties and health benefits, often used in desserts like kulfi and lassi.",
  "Thali is not just a meal but an experience that often ends with a variety of sweets like rasgulla, jalebi, or gulab jamun, making it a perfect finale to a festive feast."
];

const scoreDisplay = document.getElementById("score-display");
const challengeBox = document.getElementById("challenge");
const factBox = document.getElementById("sweet-fact");
const moveCounter = document.getElementById("move-counter");
const gameOverBox = document.getElementById("game-over");
const restartBtn = document.getElementById("restart-btn");
const leaderboardList = document.getElementById("leaderboard-list");
const board = document.getElementById("game-board");
const challengeProgressText = document.getElementById("challenge-progress-text");
const progressBar = document.getElementById("progress-bar");
const achievementBadge = document.getElementById("achievement-badge");
const bestScoreDisplay = document.getElementById("best-score-display");
const bonusIndicator = document.getElementById("bonus-indicator");
const bonusAmount = document.getElementById("bonus-amount");

let grid = Array(4).fill(null).map(() => Array(4).fill(0));
let moveCount = 0;
let score = 0;
let mergeCounts = {};
let targetReached = false;
let startX, startY;
let comboCount = 0;
let lastMoveMerges = 0;

const challengeOptions = Object.entries(mithaiNames);
const today = new Date().toDateString();
const randomIndex = [...today].reduce((acc, char) => acc + char.charCodeAt(0), 0) % challengeOptions.length;
const [targetValue, targetName] = challengeOptions[randomIndex];
const targetAmount = (randomIndex % 3 + 2);
challengeBox.textContent = `🎯 Daily Challenge: Merge ${targetAmount} ${targetName}s!`;
updateChallengeProgress(0);

function updateScore() {
  scoreDisplay.textContent = score.toLocaleString();
  scoreDisplay.classList.add('score-pop');
  setTimeout(() => scoreDisplay.classList.remove('score-pop'), 300);
}

function showAchievement(message) {
  achievementBadge.textContent = message;
  achievementBadge.classList.add('show');
  setTimeout(() => {
    achievementBadge.classList.remove('show');
  }, 3000);
}

function showBonus(bonusPoints, comboCount) {
  bonusAmount.textContent = `+${bonusPoints.toLocaleString()}`;
  if (comboCount > 1) {
    bonusIndicator.querySelector('div:first-child').textContent = `🔥 ${comboCount}x COMBO BONUS!`;
  } else {
    bonusIndicator.querySelector('div:first-child').textContent = '🎁 BONUS!';
  }
  bonusIndicator.classList.add('show');
  setTimeout(() => {
    bonusIndicator.classList.remove('show');
  }, 1500);
}

function spawnTile() {
  let empty = [];
  grid.forEach((row, r) => {
    row.forEach((val, c) => {
      if (val === 0) empty.push([r, c]);
    });
  });
  if (empty.length === 0) return;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  grid[r][c] = Math.random() < 0.9 ? 2 : 4;
  drawBoard();
}

function drawBoard() {
  board.querySelectorAll('.tile').forEach(t => t.remove());
  grid.forEach((row) => {
    row.forEach((val) => {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      if (val !== 0) {
        tile.textContent = mithaiNames[val] || val;
        tile.style.background = mithaiColors[val] || '#ffe0b2';
        tile.classList.add('new');
      } else {
        tile.classList.add('empty');
      }
      board.appendChild(tile);
    });
  });
}

function slide(row) {
  let arr = row.filter(val => val);
  let merged = Array(4).fill(false);
  
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1] && !merged[i]) {
      arr[i] *= 2;
      arr[i + 1] = 0;
      merged[i] = true;
      lastMoveMerges++; // Track total merges in this move
      
      // Calculate score with combo bonus
      let baseScore = arr[i];
      let comboMultiplier = lastMoveMerges > 1 ? 1 + (lastMoveMerges - 1) * 0.3 : 1;
      let finalScore = Math.floor(baseScore * comboMultiplier);
      let bonusPoints = finalScore - baseScore;
      
      score += finalScore;
      updateScore();
      
      // Show bonus indicator if bonus was earned
      if (bonusPoints > 0) {
        showBonus(bonusPoints, lastMoveMerges);
      }
      
      // Update merge count first, then check challenge progress
      mergeCounts[arr[i]] = (mergeCounts[arr[i]] || 0) + 1;
      updateChallengeProgress(arr[i]);
      
      if (arr[i] === 2048 && !window.hasWon) {
        window.hasWon = true;
        setTimeout(() => showAchievement("🎉 You've unlocked the Thali! You're a Mithai Master!"), 200);
      }
      triggerSweetFact();
    }
  }
  return arr.filter(val => val).concat(Array(4 - arr.filter(val => val).length).fill(0));
}

function move(dir) {
  let rotated = false;
  lastMoveMerges = 0; // Reset merge count for this move
  
  if (dir === 'up' || dir === 'down') {
    grid = grid[0].map((_, i) => grid.map(row => row[i]));
    rotated = true;
  }
  if (dir === 'right' || dir === 'down') {
    grid = grid.map(row => row.reverse());
  }
  let newGrid = grid.map(row => slide(row));
  if (dir === 'right' || dir === 'down') {
    newGrid = newGrid.map(row => row.reverse());
  }
  if (rotated) {
    newGrid = newGrid[0].map((_, i) => newGrid.map(row => row[i]));
  }
  if (JSON.stringify(grid) !== JSON.stringify(newGrid)) {
    grid = newGrid;
    
    // Check for combo (multiple merges in one move)
    if (lastMoveMerges > 1) {
      comboCount++;
      if (comboCount >= 2) {
        showAchievement(`🔥 ${lastMoveMerges}x Combo! Amazing!`);
      }
    } else {
      comboCount = 0;
    }
    
    spawnTile();
    moveCount++;
    updateMoveCounter();
    if (isGameOver()) showGameOver();
  } else {
    // Provide feedback for invalid moves
    board.style.animation = 'none';
    setTimeout(() => {
      board.style.animation = 'shake 0.3s ease';
    }, 10);
    comboCount = 0;
  }
}

function updateMoveCounter() {
  moveCounter.textContent = moveCount.toLocaleString();
}

function triggerSweetFact() {
  const fact = sweetFacts[Math.floor(Math.random() * sweetFacts.length)];
  factBox.textContent = "🍬 " + fact;
  factBox.style.animation = 'none';
  setTimeout(() => {
    factBox.style.animation = 'fadeInUp 0.5s ease';
  }, 10);
}

function updateChallengeProgress(val) {
  mergeCounts[val] = (mergeCounts[val] || 0) + 1;
  if (val == targetValue) {
    const current = mergeCounts[val];
    const progress = Math.min((current / targetAmount) * 100, 100);
    challengeProgressText.textContent = `Progress: ${current} / ${targetAmount}`;
    progressBar.style.width = `${progress}%`;
    
    if (current >= targetAmount && !targetReached) {
      targetReached = true;
      showAchievement("🎯 Challenge Complete! You're a Mithai Champion!");
    }
  }
}

function isGameOver() {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === 0) return false;
      if (c < 3 && grid[r][c] === grid[r][c + 1]) return false;
      if (r < 3 && grid[r][c] === grid[r + 1][c]) return false;
    }
  }
  return true;
}

function updateLeaderboard() {
  const scores = JSON.parse(localStorage.getItem("mithaiScores") || "[]");
  scores.push(score);
  const sorted = [...new Set(scores)].sort((a, b) => b - a).slice(0, 3);
  localStorage.setItem("mithaiScores", JSON.stringify(sorted));
  leaderboardList.innerHTML = sorted.map(s => `<li>${s.toLocaleString()} points</li>`).join("");
  
  // Update best score display
  const bestScore = sorted.length > 0 ? sorted[0] : 0;
  const currentBest = parseInt(localStorage.getItem("mithaiBestScore") || "0");
  if (score > currentBest) {
    localStorage.setItem("mithaiBestScore", score.toString());
    bestScoreDisplay.textContent = score.toLocaleString();
    bestScoreDisplay.classList.add('score-pop');
    setTimeout(() => bestScoreDisplay.classList.remove('score-pop'), 300);
  } else {
    bestScoreDisplay.textContent = currentBest.toLocaleString();
  }
}

function showGameOver() {
  gameOverBox.classList.add('show');
  updateLeaderboard();
}

function restartGame() {
  grid = Array(4).fill(null).map(() => Array(4).fill(0));
  moveCount = 0;
  score = 0;
  mergeCounts = {};
  targetReached = false;
  window.hasWon = false;
  comboCount = 0;
  lastMoveMerges = 0;
  gameOverBox.classList.remove('show');
  updateMoveCounter();
  updateScore();
  // Reset challenge progress display
  challengeProgressText.textContent = `Progress: 0 / ${targetAmount}`;
  progressBar.style.width = '0%';
  spawnTile();
  spawnTile();
  drawBoard();
}

restartBtn.addEventListener('click', restartGame);

document.addEventListener('keydown', e => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault();
    move(e.key.replace('Arrow', '').toLowerCase());
  }
});

board.addEventListener('touchstart', e => {
  e.preventDefault();
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
}, { passive: false });

board.addEventListener('touchmove', e => {
  e.preventDefault();
}, { passive: false });

board.addEventListener('touchend', e => {
  e.preventDefault();
  if (!startX || !startY) return;
  const dx = e.changedTouches[0].clientX - startX;
  const dy = e.changedTouches[0].clientY - startY;
  const minSwipe = 30;
  
  if (Math.abs(dx) > minSwipe || Math.abs(dy) > minSwipe) {
  if (Math.abs(dx) > Math.abs(dy)) {
    move(dx > 0 ? 'right' : 'left');
  } else {
    move(dy > 0 ? 'down' : 'up');
  }
  }
  startX = null;
  startY = null;
}, { passive: false });

// Prevent pull-to-refresh and other unwanted gestures
document.addEventListener('touchmove', function(e) {
  if (e.target.closest('#game-board')) {
    e.preventDefault();
  }
}, { passive: false });

// Prevent zoom on double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', function(e) {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    e.preventDefault();
  }
  lastTouchEnd = now;
}, false);

// Lock screen orientation on mobile (if supported)
if (screen.orientation && screen.orientation.lock) {
  screen.orientation.lock('portrait').catch(() => {});
}

function init() {
  spawnTile();
  spawnTile();
  updateLeaderboard();
  updateScore();
  updateMoveCounter();
  // Load and display best score
  const bestScore = parseInt(localStorage.getItem("mithaiBestScore") || "0");
  bestScoreDisplay.textContent = bestScore.toLocaleString();
}

// Initialize game when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

