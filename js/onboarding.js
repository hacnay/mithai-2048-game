// Onboarding Manager for First-Time Users

class OnboardingManager {
  constructor() {
    this.overlay = document.getElementById('onboarding-overlay');
    this.slides = document.querySelectorAll('.onboarding-slide');
    this.dots = document.querySelectorAll('.onboarding-dots .dot');
    this.currentSlide = 0;
    this.hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding') === 'true';
    
    this.init();
  }
  
  init() {
    // Make functions globally available
    window.onboardingNext = () => this.next();
    window.onboardingComplete = () => this.complete();
  }
  
  checkAndShow() {
    if (!this.hasSeenOnboarding && this.overlay) {
      // Small delay for smooth transition from loading
      setTimeout(() => {
        this.show();
      }, 300);
    }
  }
  
  show() {
    if (this.overlay) {
      this.overlay.style.display = 'flex';
      this.currentSlide = 0;
      this.updateSlide();
    }
  }
  
  hide() {
    if (this.overlay) {
      this.overlay.style.display = 'none';
    }
  }
  
  next() {
    if (this.currentSlide < this.slides.length - 1) {
      this.currentSlide++;
      this.updateSlide();
    } else {
      this.complete();
    }
  }
  
  previous() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateSlide();
    }
  }
  
  updateSlide() {
    // Update slides
    this.slides.forEach((slide, index) => {
      if (index === this.currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
    
    // Update dots
    this.dots.forEach((dot, index) => {
      if (index === this.currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  complete() {
    this.hide();
    localStorage.setItem('hasSeenOnboarding', 'true');
    this.hasSeenOnboarding = true;
    
    // Show welcome message
    if (window.showAchievement) {
      setTimeout(() => {
        showAchievement('Welcome! Enjoy playing Mithai Merge Mania! 🎉');
      }, 500);
    }
  }
  
  // Allow users to replay onboarding
  replay() {
    localStorage.removeItem('hasSeenOnboarding');
    this.hasSeenOnboarding = false;
    this.show();
  }
}

// Initialize onboarding manager
const onboardingManager = new OnboardingManager();
window.onboardingManager = onboardingManager;

