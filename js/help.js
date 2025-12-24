// Help/FAQ Modal Manager

class HelpManager {
  constructor() {
    this.helpModal = document.getElementById('help-modal');
    this.helpBtn = document.getElementById('help-btn');
    this.helpClose = document.getElementById('help-close');
    
    this.init();
  }
  
  init() {
    if (this.helpBtn) {
      this.helpBtn.addEventListener('click', () => this.show());
    }
    
    if (this.helpClose) {
      this.helpClose.addEventListener('click', () => this.hide());
    }
    
    // Close on outside click
    if (this.helpModal) {
      this.helpModal.addEventListener('click', (e) => {
        if (e.target === this.helpModal) {
          this.hide();
        }
      });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isVisible()) {
        this.hide();
      }
    });
  }
  
  show() {
    if (this.helpModal) {
      this.helpModal.style.display = 'flex';
      // Close settings menu if open
      const settingsMenu = document.getElementById('settings-menu');
      if (settingsMenu) {
        settingsMenu.style.display = 'none';
      }
    }
  }
  
  hide() {
    if (this.helpModal) {
      this.helpModal.style.display = 'none';
    }
  }
  
  isVisible() {
    return this.helpModal && this.helpModal.style.display !== 'none';
  }
  
  toggle() {
    if (this.isVisible()) {
      this.hide();
    } else {
      this.show();
    }
  }
}

// Initialize help manager
const helpManager = new HelpManager();
window.helpManager = helpManager;

