// Error Handler with Toast Notifications

class ErrorHandler {
  constructor() {
    this.errorToast = document.getElementById('error-toast');
    this.errorMessage = document.getElementById('error-message');
    this.errorClose = document.getElementById('error-close');
    this.timeout = null;
    
    this.init();
    this.setupGlobalErrorHandling();
  }
  
  init() {
    if (this.errorClose) {
      this.errorClose.addEventListener('click', () => this.hide());
    }
  }
  
  setupGlobalErrorHandling() {
    // Catch unhandled errors
    window.addEventListener('error', (event) => {
      this.show('An unexpected error occurred. Please try again.');
      console.error('Unhandled error:', event.error);
    });
    
    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.show('Something went wrong. Please refresh the page.');
      console.error('Unhandled promise rejection:', event.reason);
    });
  }
  
  show(message, duration = 5000) {
    if (!this.errorToast || !this.errorMessage) return;
    
    // Clear existing timeout
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    
    this.errorMessage.textContent = message;
    this.errorToast.classList.add('show');
    
    // Auto-hide after duration
    this.timeout = setTimeout(() => {
      this.hide();
    }, duration);
  }
  
  hide() {
    if (this.errorToast) {
      this.errorToast.classList.remove('show');
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }
  
  // Specific error types
  showNetworkError() {
    this.show('Network error. Please check your connection.');
  }
  
  showStorageError() {
    this.show('Unable to save data. Please check your browser settings.');
  }
  
  showGameError(message) {
    this.show(`Game error: ${message}`);
  }
  
  showValidationError(message) {
    this.show(`Invalid input: ${message}`);
  }
}

// Initialize error handler
const errorHandler = new ErrorHandler();
window.errorHandler = errorHandler;

// Helper function for try-catch blocks
window.safeExecute = function(fn, errorMessage = 'An error occurred') {
  try {
    return fn();
  } catch (error) {
    errorHandler.show(errorMessage);
    console.error(error);
    return null;
  }
};

// Helper for async functions
window.safeAsync = async function(fn, errorMessage = 'An error occurred') {
  try {
    return await fn();
  } catch (error) {
    errorHandler.show(errorMessage);
    console.error(error);
    return null;
  }
};

