// Loading Screen Manager

class LoadingManager {
  constructor() {
    this.loadingScreen = document.getElementById('loading-screen');
    this.init();
  }
  
  init() {
    // Simulate loading process
    this.simulateLoading();
  }
  
  simulateLoading() {
    // Check if resources are loaded
    const checkResources = () => {
      // Wait for DOM and scripts to be ready
      if (document.readyState === 'complete' && 
          typeof window.audioManager !== 'undefined' &&
          typeof window.particleSystem !== 'undefined' &&
          typeof window.themeManager !== 'undefined') {
        this.hide();
      } else {
        setTimeout(checkResources, 100);
      }
    };
    
    // Minimum loading time for smooth experience
    setTimeout(() => {
      checkResources();
    }, 1500);
  }
  
  hide() {
    if (this.loadingScreen) {
      this.loadingScreen.classList.add('hidden');
      setTimeout(() => {
        this.loadingScreen.style.display = 'none';
        // Check if onboarding should be shown
        if (window.onboardingManager) {
          window.onboardingManager.checkAndShow();
        }
      }, 500);
    }
  }
  
  show() {
    if (this.loadingScreen) {
      this.loadingScreen.style.display = 'flex';
      this.loadingScreen.classList.remove('hidden');
    }
  }
}

// Initialize loading manager
const loadingManager = new LoadingManager();
window.loadingManager = loadingManager;

