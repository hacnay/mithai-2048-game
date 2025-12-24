// Theme Management for Mithai Merge Mania

class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }
  
  init() {
    this.setTheme(this.currentTheme);
    this.setupThemeSelector();
    this.setupSettingsToggle();
  }
  
  setTheme(theme) {
    this.currentTheme = theme;
    document.body.className = document.body.className.replace(/light-mode|dark-mode|colorful-theme|classic-theme/g, '');
    document.body.classList.add(`${theme}-theme`);
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    }
    localStorage.setItem('theme', theme);
    
    // Update active button
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
  }
  
  setupThemeSelector() {
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setTheme(btn.dataset.theme);
      });
    });
  }
  
  setupSettingsToggle() {
    const settingsToggle = document.getElementById('settings-toggle');
    const settingsMenu = document.getElementById('settings-menu');
    
    settingsToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = settingsMenu.style.display !== 'none';
      settingsMenu.style.display = isVisible ? 'none' : 'block';
    });
    
    // Close settings when clicking outside
    document.addEventListener('click', (e) => {
      if (!settingsMenu.contains(e.target) && !settingsToggle.contains(e.target)) {
        settingsMenu.style.display = 'none';
      }
    });
  }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Export for use in game.js
window.themeManager = themeManager;

