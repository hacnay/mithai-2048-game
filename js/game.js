// Game Constants
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

// DOM Elements
const container = document.querySelector('.container');
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
const undoBtn = document.getElementById("undo-btn");
const undoCountDisplay = document.getElementById("undo-count");
const hintBtn = document.getElementById("hint-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const removeBtn = document.getElementById("remove-btn");
const freezeBtn = document.getElementById("freeze-btn");
const doubleBtn = document.getElementById("double-btn");
const timerDisplay = document.getElementById("timer-display");
const timerCard = document.getElementById("timer-card");
const targetMovesDisplay = document.getElementById("target-moves-display");
const targetMovesCard = document.getElementById("target-moves-card");
const targetCard = document.getElementById("target-card");
const targetTileName = document.getElementById("target-tile-name");
const targetTileValue = document.getElementById("target-tile-value");
const targetProgressText = document.getElementById("target-progress-text");
const challengeCard = document.getElementById("challenge-card");

// Game State
let grid = [];
let boardSize = 4;
let moveCount = 0;
let score = 0;
let mergeCounts = {};
let targetReached = false;
let startX, startY;
let comboCount = 0;
let lastMoveMerges = 0;
let gameMode = 'classic'; // classic, time, endless, target
let undoHistory = [];
let maxUndos = 3;
let undoCount = maxUndos;
let hintActive = false;
let removeMode = false;
let freezeMoves = 0;
let doubleMergeActive = false;
let timerInterval = null;
let timeLeft = 60;
let targetMoves = 50;
let targetTile = 2048;
let highestTile = 0;

// Challenge setup (will be initialized in init)
let targetValue, targetName, targetAmount;

// Initialize grid based on board size
function initGrid(size) {
  boardSize = size;
  grid = Array(size).fill(null).map(() => Array(size).fill(0));
  updateBoardSize();
}

// Update board CSS grid based on size
function updateBoardSize() {
  board.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;
}

// Save game state for undo
function saveState() {
  if (undoHistory.length >= maxUndos) {
    undoHistory.shift();
  }
  undoHistory.push({
    grid: grid.map(row => [...row]),
    score: score,
    moveCount: moveCount,
    mergeCounts: {...mergeCounts}
  });
  updateUndoButton();
}

// Undo last move
function undoMove() {
  if (undoHistory.length === 0 || undoCount <= 0) {
    showAchievement("No undos left!");
    return;
  }
  
  const state = undoHistory.pop();
  grid = state.grid.map(row => [...row]);
  score = state.score;
  moveCount = state.moveCount;
  mergeCounts = {...state.mergeCounts};
  undoCount--;
  
  updateScore();
  updateMoveCounter();
  updateUndoButton();
  drawBoard();
  gameOverBox.classList.remove('show');
  showAchievement("Move undone!");
}

function updateUndoButton() {
  undoCountDisplay.textContent = undoCount;
  undoBtn.disabled = undoHistory.length === 0 || undoCount <= 0;
}

// Calculate best move (hint system)
function calculateBestMove() {
  const directions = ['up', 'down', 'left', 'right'];
  let bestDir = null;
  let bestScore = -1;
  let bestEmptyCount = -1;
  
  for (const dir of directions) {
    const testGrid = grid.map(row => [...row]);
    const result = simulateMove(testGrid, dir);
    
    if (result.moved) {
      // Count empty cells after move
      let emptyCount = 0;
      result.grid.forEach(row => {
        row.forEach(cell => {
          if (cell === 0) emptyCount++;
        });
      });
      
      // Prefer moves that create more space and higher scores
      const moveScore = result.score + emptyCount * 10;
      if (moveScore > bestScore || (moveScore === bestScore && emptyCount > bestEmptyCount)) {
        bestScore = moveScore;
        bestEmptyCount = emptyCount;
        bestDir = dir;
      }
    }
  }
  
  return bestDir;
}

// Simulate a move without actually executing it
function simulateMove(testGrid, dir) {
  const size = testGrid.length;
  let rotated = false;
  let moved = false;
  let scoreGain = 0;
  
  if (dir === 'up' || dir === 'down') {
    testGrid = testGrid[0].map((_, i) => testGrid.map(row => row[i]));
    rotated = true;
  }
  if (dir === 'right' || dir === 'down') {
    testGrid = testGrid.map(row => row.reverse());
  }
  
  let newGrid = testGrid.map(row => {
    let arr = row.filter(val => val);
    let merged = Array(size).fill(false);
    
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1] && !merged[i]) {
        arr[i] *= 2;
        arr[i + 1] = 0;
        merged[i] = true;
        scoreGain += arr[i];
        moved = true;
      }
    }
    return arr.filter(val => val).concat(Array(size - arr.filter(val => val).length).fill(0));
  });
  
  if (dir === 'right' || dir === 'down') {
    newGrid = newGrid.map(row => row.reverse());
  }
  if (rotated) {
    newGrid = newGrid[0].map((_, i) => newGrid.map(row => row[i]));
  }
  
  moved = moved || JSON.stringify(testGrid) !== JSON.stringify(newGrid);
  
  return { grid: newGrid, moved, score: scoreGain };
}

// Show hint
function showHint() {
  if (hintActive) {
    // Remove existing hint
    board.querySelectorAll('.hint-indicator').forEach(el => el.remove());
    hintActive = false;
    hintBtn.textContent = '💡 Hint';
    return;
  }
  
  const bestDir = calculateBestMove();
  if (!bestDir) {
    showAchievement("No valid moves available!");
    return;
  }
  
  // Add visual indicator
  board.querySelectorAll('.hint-indicator').forEach(el => el.remove());
  const indicator = document.createElement('div');
  indicator.classList.add('hint-indicator');
  board.appendChild(indicator);
  
  hintActive = true;
  hintBtn.textContent = '💡 Hide';
  showAchievement(`Best move: ${bestDir.toUpperCase()}`);
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    indicator.remove();
    hintActive = false;
    hintBtn.textContent = '💡 Hint';
  }, 3000);
}

// Power-up: Shuffle
function shuffleTiles() {
  let allTiles = [];
  grid.forEach((row, r) => {
    row.forEach((val, c) => {
      if (val !== 0) allTiles.push(val);
      grid[r][c] = 0;
    });
  });
  
  // Shuffle array
  for (let i = allTiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allTiles[i], allTiles[j]] = [allTiles[j], allTiles[i]];
  }
  
  // Place shuffled tiles back
  let idx = 0;
  grid.forEach((row, r) => {
    row.forEach((val, c) => {
      if (val === 0 && idx < allTiles.length) {
        grid[r][c] = allTiles[idx++];
      }
    });
  });
  
  drawBoard();
  showAchievement("Tiles shuffled!");
}

// Power-up: Remove tile
function activateRemoveMode() {
  if (removeMode) {
    removeMode = false;
    removeBtn.classList.remove('active');
    board.querySelectorAll('.tile.selectable').forEach(t => t.classList.remove('selectable'));
    return;
  }
  
  removeMode = true;
  removeBtn.classList.add('active');
  
  // Make all tiles selectable
  board.querySelectorAll('.tile:not(.empty)').forEach(tile => {
    tile.classList.add('selectable');
    tile.addEventListener('click', handleTileRemove, { once: true });
  });
  
  showAchievement("Click a tile to remove it");
}

function handleTileRemove(e) {
  const tiles = Array.from(board.querySelectorAll('.tile'));
  const index = tiles.indexOf(e.target);
  const row = Math.floor(index / boardSize);
  const col = index % boardSize;
  
  grid[row][col] = 0;
  removeMode = false;
  removeBtn.classList.remove('active');
  board.querySelectorAll('.tile.selectable').forEach(t => {
    t.classList.remove('selectable');
    t.removeEventListener('click', handleTileRemove);
  });
  
  drawBoard();
  showAchievement("Tile removed!");
}

// Power-up: Freeze
function activateFreeze() {
  freezeMoves = 3;
  freezeBtn.classList.add('active');
  freezeBtn.disabled = true;
  showAchievement("New tiles frozen for 3 moves!");
  
  setTimeout(() => {
    freezeMoves = 0;
    freezeBtn.classList.remove('active');
    freezeBtn.disabled = false;
  }, 3000);
}

// Power-up: Double merge
function activateDoubleMerge() {
  doubleMergeActive = true;
  doubleBtn.classList.add('active');
  doubleBtn.disabled = true;
  showAchievement("Next merge will count double!");
}

// Update score display
function updateScore() {
  scoreDisplay.textContent = score.toLocaleString();
  scoreDisplay.classList.add('score-pop');
  setTimeout(() => scoreDisplay.classList.remove('score-pop'), 300);
}

function showAchievement(message) {
  achievementBadge.textContent = message;
  achievementBadge.classList.add('show');
  
  // Play achievement sound
  if (window.audioManager) {
    window.audioManager.playAchievementSound();
  }
  
  // Create confetti
  if (window.particleSystem) {
    window.particleSystem.createConfetti(150);
  }
  
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
  if (freezeMoves > 0) {
    freezeMoves--;
    if (freezeMoves === 0) {
      freezeBtn.classList.remove('active');
      freezeBtn.disabled = false;
    }
    return;
  }
  
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

// Store previous grid for animation
let previousGrid = [];

function drawBoard() {
  board.querySelectorAll('.hint-indicator').forEach(t => t.remove());
  
  // Create new tiles with smooth animations
  grid.forEach((row, r) => {
    row.forEach((val, c) => {
      const index = r * boardSize + c;
      let tile = board.querySelector(`.tile[data-index="${index}"]`);
      
      if (!tile) {
        tile = document.createElement('div');
        tile.classList.add('tile');
        tile.setAttribute('data-index', index);
        tile.style.opacity = '0';
        board.appendChild(tile);
      }
      
      // Update tile content
      if (val !== 0) {
        const prevVal = previousGrid[r] && previousGrid[r][c];
        tile.textContent = mithaiNames[val] || val;
        tile.style.background = mithaiColors[val] || '#ffe0b2';
        tile.classList.remove('empty');
        tile.classList.add('new');
        
        // Animate if value changed
        if (prevVal !== val) {
          tile.style.animation = 'none';
          setTimeout(() => {
            tile.style.animation = 'tilePop 0.3s ease';
          }, 10);
        }
      } else {
        tile.classList.add('empty');
        tile.classList.remove('new');
        tile.textContent = '';
        tile.style.background = '';
      }
      
      // Smooth fade in
      setTimeout(() => {
        tile.style.opacity = '1';
      }, 50);
    });
  });
  
  // Remove tiles that no longer exist
  board.querySelectorAll('.tile').forEach(tile => {
    const index = parseInt(tile.getAttribute('data-index'));
    const r = Math.floor(index / boardSize);
    const c = index % boardSize;
    if (r >= boardSize || c >= boardSize || !grid[r] || grid[r][c] === undefined) {
      tile.remove();
    }
  });
  
  // Save current grid for next animation
  previousGrid = grid.map(row => [...row]);
  
  // Update highest tile for target mode
  if (gameMode === 'target') {
    let max = 0;
    grid.forEach(row => {
      row.forEach(val => {
        if (val > max) max = val;
      });
    });
    highestTile = max;
    targetProgressText.textContent = `Highest: ${mithaiNames[highestTile] || highestTile} (${highestTile})`;
    
    if (highestTile >= targetTile) {
      showAchievement("🎉 Target reached! You win!");
      if (timerInterval) clearInterval(timerInterval);
    }
  }
}

function slide(row) {
  let arr = row.filter(val => val);
  let merged = Array(boardSize).fill(false);
  
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1] && !merged[i]) {
      const mergedValue = arr[i] * 2;
      arr[i] = mergedValue;
      arr[i + 1] = 0;
      merged[i] = true;
      lastMoveMerges++;
      
      // Play merge sound
      if (window.audioManager) {
        window.audioManager.playMergeSound(mergedValue);
      }
      
      // Create particle effect (will be triggered after board redraw)
      setTimeout(() => {
        const tiles = board.querySelectorAll('.tile:not(.empty)');
        tiles.forEach(tile => {
          if (tile.textContent === (mithaiNames[mergedValue] || mergedValue)) {
            if (window.particleSystem) {
              window.particleSystem.createMergeParticles(tile, mergedValue);
            }
          }
        });
      }, 100);
      
      let baseScore = mergedValue;
      if (doubleMergeActive) {
        baseScore *= 2;
        doubleMergeActive = false;
        doubleBtn.classList.remove('active');
        doubleBtn.disabled = false;
      }
      
      let comboMultiplier = lastMoveMerges > 1 ? 1 + (lastMoveMerges - 1) * 0.3 : 1;
      let finalScore = Math.floor(baseScore * comboMultiplier);
      let bonusPoints = finalScore - baseScore;
      
      score += finalScore;
      updateScore();
      
      if (bonusPoints > 0) {
        showBonus(bonusPoints, lastMoveMerges);
      }
      
      mergeCounts[mergedValue] = (mergeCounts[mergedValue] || 0) + 1;
      updateChallengeProgress(mergedValue);
      
      if (mergedValue === 2048 && !window.hasWon && gameMode !== 'endless') {
        window.hasWon = true;
        setTimeout(() => {
          showAchievement("🎉 You've unlocked the Thali! You're a Mithai Master!");
          // Extra confetti for 2048
          if (window.particleSystem) {
            setTimeout(() => window.particleSystem.createConfetti(200), 500);
          }
        }, 200);
      }
      triggerSweetFact();
    }
  }
  return arr.filter(val => val).concat(Array(boardSize - arr.filter(val => val).length).fill(0));
}

function move(dir) {
  if (removeMode) return;
  
  try {
    let rotated = false;
    lastMoveMerges = 0;
    
    // Save state before move for undo
    saveState();
    
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
      
      // Play move sound
      if (window.audioManager) {
        window.audioManager.playMoveSound();
      }
      
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
      
      // Update target mode moves
      if (gameMode === 'target' && targetMovesDisplay) {
        targetMoves--;
        targetMovesDisplay.textContent = targetMoves;
        if (targetMoves <= 0 && highestTile < targetTile) {
          showGameOver();
          return;
        }
      }
      
      if (isGameOver()) {
        showGameOver();
      }
    } else {
      // Invalid move - remove from undo history
      undoHistory.pop();
      if (board) {
        board.style.animation = 'none';
        setTimeout(() => {
          board.style.animation = 'shake 0.3s ease';
        }, 10);
      }
      comboCount = 0;
    }
    
    updateUndoButton();
  } catch (error) {
    if (window.errorHandler) {
      window.errorHandler.showGameError('Move failed. Please try again.');
    }
    console.error('Move error:', error);
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
      // Confetti for challenge completion
      if (window.particleSystem) {
        setTimeout(() => window.particleSystem.createConfetti(100), 300);
      }
    }
  }
}

function isGameOver() {
  for (let r = 0; r < boardSize; r++) {
    for (let c = 0; c < boardSize; c++) {
      if (grid[r][c] === 0) return false;
      if (c < boardSize - 1 && grid[r][c] === grid[r][c + 1]) return false;
      if (r < boardSize - 1 && grid[r][c] === grid[r + 1][c]) return false;
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
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  gameOverBox.classList.add('show');
  updateLeaderboard();
}

// Timer for Time mode
function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    
    if (timeLeft <= 10) {
      timerDisplay.style.color = '#f44336';
    }
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showGameOver();
    }
  }, 1000);
}

// Change game mode
function changeGameMode(mode) {
  gameMode = mode;
  
  // Update UI
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
  
  // Show/hide relevant cards
  timerCard.style.display = mode === 'time' ? 'block' : 'none';
  targetMovesCard.style.display = mode === 'target' ? 'block' : 'none';
  targetCard.style.display = mode === 'target' ? 'block' : 'none';
  challengeCard.style.display = mode === 'classic' ? 'block' : 'none';
  
  // Reset game
  restartGame();
  
  // Start timer for time mode
  if (mode === 'time') {
    timeLeft = 60;
    timerDisplay.textContent = timeLeft;
    timerDisplay.style.color = '#5d4037';
    startTimer();
  }
  
  // Setup target mode
  if (mode === 'target') {
    const targetOptions = [256, 512, 1024, 2048];
    targetTile = targetOptions[Math.floor(Math.random() * targetOptions.length)];
    targetTileName.textContent = mithaiNames[targetTile];
    targetTileValue.textContent = targetTile;
    targetMoves = 50;
    targetMovesDisplay.textContent = targetMoves;
    highestTile = 0;
  }
}

// Change board size
function changeBoardSize(size) {
  boardSize = parseInt(size);
  
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.size === size);
  });
  
  restartGame();
}

function restartGame() {
  try {
    // Smooth transition
    if (container) {
      container.classList.add('fade-in');
    }
    
    initGrid(boardSize);
    previousGrid = grid.map(row => [...row]); // Initialize previous grid
    moveCount = 0;
    score = 0;
    mergeCounts = {};
    targetReached = false;
    window.hasWon = false;
    comboCount = 0;
    lastMoveMerges = 0;
    undoHistory = [];
    undoCount = maxUndos;
    hintActive = false;
    removeMode = false;
    freezeMoves = 0;
    doubleMergeActive = false;
    highestTile = 0;
    
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    
    if (gameMode === 'time' && timerDisplay) {
      timeLeft = 60;
      timerDisplay.textContent = timeLeft;
      timerDisplay.style.color = '#5d4037';
      startTimer();
    }
    
    if (gameMode === 'target' && targetMovesDisplay) {
      targetMoves = 50;
      targetMovesDisplay.textContent = targetMoves;
    }
    
    if (gameOverBox) {
      gameOverBox.classList.remove('show');
    }
    updateMoveCounter();
    updateScore();
    updateUndoButton();
    if (gameMode === 'classic') {
      if (challengeProgressText) {
        challengeProgressText.textContent = `Progress: 0 / ${targetAmount}`;
      }
      if (progressBar) {
        progressBar.style.width = '0%';
      }
      targetReached = false;
    }
    
    // Remove hint indicators
    if (board) {
      board.querySelectorAll('.hint-indicator').forEach(el => el.remove());
    }
    if (hintBtn) {
      hintBtn.textContent = '💡 Hint';
    }
    hintActive = false;
    
    // Reset power-up buttons
    if (removeBtn) removeBtn.classList.remove('active');
    if (freezeBtn) {
      freezeBtn.classList.remove('active');
      freezeBtn.disabled = false;
    }
    if (doubleBtn) {
      doubleBtn.classList.remove('active');
      doubleBtn.disabled = false;
    }
    
    spawnTile();
    spawnTile();
    drawBoard();
    
    // Remove fade-in class after animation
    if (container) {
      setTimeout(() => {
        container.classList.remove('fade-in');
      }, 500);
    }
  } catch (error) {
    if (window.errorHandler) {
      window.errorHandler.showGameError('Failed to restart game. Please try again.');
    }
    console.error('Restart error:', error);
  }
}

// Event Listeners
restartBtn.addEventListener('click', restartGame);
undoBtn.addEventListener('click', undoMove);
hintBtn.addEventListener('click', showHint);
shuffleBtn.addEventListener('click', shuffleTiles);
removeBtn.addEventListener('click', activateRemoveMode);
freezeBtn.addEventListener('click', activateFreeze);
doubleBtn.addEventListener('click', activateDoubleMerge);

// Mode selector
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => changeGameMode(btn.dataset.mode));
});

// Size selector
document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', () => changeBoardSize(btn.dataset.size));
});

// Keyboard controls
document.addEventListener('keydown', e => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault();
    move(e.key.replace('Arrow', '').toLowerCase());
  }
});

// Touch controls
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

// Prevent pull-to-refresh
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

// Lock screen orientation
if (screen.orientation && screen.orientation.lock) {
  screen.orientation.lock('portrait').catch(() => {});
}

function init() {
  // Initialize challenge
  const challengeOptions = Object.entries(mithaiNames);
  const today = new Date().toDateString();
  const randomIndex = [...today].reduce((acc, char) => acc + char.charCodeAt(0), 0) % challengeOptions.length;
  [targetValue, targetName] = challengeOptions[randomIndex];
  targetAmount = (randomIndex % 3 + 2);
  challengeBox.textContent = `🎯 Daily Challenge: Merge ${targetAmount} ${targetName}s!`;
  challengeProgressText.textContent = `Progress: 0 / ${targetAmount}`;
  progressBar.style.width = '0%';
  
  initGrid(4);
  previousGrid = grid.map(row => [...row]); // Initialize previous grid
  spawnTile();
  spawnTile();
  updateLeaderboard();
  updateScore();
  updateMoveCounter();
  updateUndoButton();
  const bestScore = parseInt(localStorage.getItem("mithaiBestScore") || "0");
  bestScoreDisplay.textContent = bestScore.toLocaleString();
}

// Initialize game when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
