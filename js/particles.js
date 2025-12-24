// Particle System for Mithai Merge Mania

class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById('particle-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    
    this.startAnimation();
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createParticle(x, y, color, type = 'merge') {
    const particle = {
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4 - 2,
      life: 1.0,
      decay: 0.02 + Math.random() * 0.02,
      size: type === 'merge' ? 4 + Math.random() * 4 : 2 + Math.random() * 2,
      color: color || this.getRandomColor(),
      type: type
    };
    
    this.particles.push(particle);
  }
  
  getRandomColor() {
    const colors = [
      '#ffc107', '#ff9800', '#ff6b35', '#f7931e',
      '#ffd700', '#ffa500', '#ff8c00', '#ff6347'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  // Create merge particles at tile position
  createMergeParticles(tileElement, value) {
    const rect = tileElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const particleCount = Math.min(10 + Math.floor(value / 100), 30);
    
    for (let i = 0; i < particleCount; i++) {
      this.createParticle(centerX, centerY, this.getRandomColor(), 'merge');
    }
  }
  
  // Create confetti particles
  createConfetti(count = 100) {
    for (let i = 0; i < count; i++) {
      const x = Math.random() * this.canvas.width;
      const y = -10;
      const colors = ['#ffc107', '#ff9800', '#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#00bcd4', '#4caf50'];
      this.createParticle(x, y, colors[Math.floor(Math.random() * colors.length)], 'confetti');
    }
  }
  
  updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.1; // Gravity
      p.life -= p.decay;
      
      if (p.type === 'confetti') {
        p.vx *= 0.99; // Air resistance
        p.vy *= 0.99;
        p.rotation = (p.rotation || 0) + 5;
      }
      
      if (p.life <= 0 || p.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
      }
    }
  }
  
  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(p => {
      this.ctx.save();
      this.ctx.globalAlpha = p.life;
      
      if (p.type === 'confetti') {
        // Draw confetti as rectangles
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation || 0) * Math.PI / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 2);
      } else {
        // Draw merge particles as circles
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
      
      this.ctx.restore();
    });
  }
  
  animate() {
    this.updateParticles();
    this.drawParticles();
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  startAnimation() {
    if (!this.animationId) {
      this.animate();
    }
  }
  
  stopAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}

// Initialize particle system
const particleSystem = new ParticleSystem();

// Export for use in game.js
window.particleSystem = particleSystem;

