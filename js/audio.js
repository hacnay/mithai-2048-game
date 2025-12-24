// Audio System for Mithai Merge Mania

class AudioManager {
  constructor() {
    this.soundsEnabled = localStorage.getItem('soundsEnabled') !== 'false';
    this.musicEnabled = localStorage.getItem('musicEnabled') !== 'false';
    this.audioContext = null;
    this.musicAudio = document.getElementById('background-music');
    
    this.initAudioContext();
    this.setupAudioControls();
    this.loadSettings();
  }
  
  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.log('Web Audio API not supported');
    }
  }
  
  // Generate sound using Web Audio API
  playTone(frequency, duration, type = 'sine', volume = 0.3) {
    if (!this.soundsEnabled || !this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }
  
  // Play merge sound
  playMergeSound(value) {
    if (!this.soundsEnabled) return;
    
    // Higher value = higher pitch
    const baseFreq = 200 + (Math.log2(value / 2) * 50);
    this.playTone(baseFreq, 0.2, 'sine', 0.4);
    
    // Add harmonic
    setTimeout(() => {
      this.playTone(baseFreq * 2, 0.15, 'sine', 0.2);
    }, 50);
  }
  
  // Play move sound
  playMoveSound() {
    if (!this.soundsEnabled) return;
    this.playTone(150, 0.1, 'square', 0.2);
  }
  
  // Play achievement sound
  playAchievementSound() {
    if (!this.soundsEnabled) return;
    
    // Play a fanfare sequence
    const notes = [262, 330, 392, 523]; // C, E, G, C
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 0.3, 'sine', 0.5);
      }, i * 150);
    });
  }
  
  // Play background music (synthetic Indian-style melody)
  playBackgroundMusic() {
    if (!this.musicEnabled || !this.audioContext) return;
    
    // Create a simple looping melody using Web Audio API
    const playMelody = () => {
      if (!this.musicEnabled) return;
      
      const scale = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]; // C major scale
      const melody = [0, 2, 4, 2, 0, 4, 5, 4, 2, 0, 2, 4, 7, 4, 2, 0];
      let noteIndex = 0;
      
      const playNote = () => {
        if (!this.musicEnabled) return;
        
        const freq = scale[melody[noteIndex % melody.length]];
        this.playTone(freq, 0.4, 'sine', 0.1);
        
        noteIndex++;
        setTimeout(playNote, 500);
      };
      
      playNote();
    };
    
    // Start music after a short delay
    setTimeout(playMelody, 1000);
  }
  
  stopBackgroundMusic() {
    this.musicEnabled = false;
  }
  
  setupAudioControls() {
    const soundToggle = document.getElementById('sound-toggle');
    const musicToggle = document.getElementById('music-toggle');
    const soundIcon = document.getElementById('sound-icon');
    const musicIcon = document.getElementById('music-icon');
    
    soundToggle.addEventListener('click', () => {
      this.soundsEnabled = !this.soundsEnabled;
      localStorage.setItem('soundsEnabled', this.soundsEnabled);
      soundIcon.textContent = this.soundsEnabled ? '🔊' : '🔇';
      soundToggle.classList.toggle('muted', !this.soundsEnabled);
    });
    
    musicToggle.addEventListener('click', () => {
      this.musicEnabled = !this.musicEnabled;
      localStorage.setItem('musicEnabled', this.musicEnabled);
      musicIcon.textContent = this.musicEnabled ? '🎵' : '🔇';
      musicToggle.classList.toggle('muted', !this.musicEnabled);
      
      if (this.musicEnabled) {
        this.playBackgroundMusic();
      } else {
        this.stopBackgroundMusic();
      }
    });
  }
  
  loadSettings() {
    const soundIcon = document.getElementById('sound-icon');
    const musicIcon = document.getElementById('music-icon');
    const soundToggle = document.getElementById('sound-toggle');
    const musicToggle = document.getElementById('music-toggle');
    
    soundIcon.textContent = this.soundsEnabled ? '🔊' : '🔇';
    musicIcon.textContent = this.musicEnabled ? '🎵' : '🔇';
    soundToggle.classList.toggle('muted', !this.soundsEnabled);
    musicToggle.classList.toggle('muted', !this.musicEnabled);
    
    if (this.musicEnabled) {
      // Start music after user interaction
      document.addEventListener('click', () => {
        if (this.musicEnabled && this.audioContext && this.audioContext.state === 'suspended') {
          this.audioContext.resume();
          this.playBackgroundMusic();
        }
      }, { once: true });
    }
  }
}

// Initialize audio manager
const audioManager = new AudioManager();

// Export for use in game.js
window.audioManager = audioManager;

