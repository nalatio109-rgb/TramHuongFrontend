import React, { useEffect, useRef } from 'react';

const SmokeEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class SmokeParticle {
      constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.reset();
        // Stagger spawn heights initially so particles don't all start at bottom
        this.y = Math.random() * this.canvasHeight;
      }

      reset() {
        // Spawn in sources (like incense burners at bottom center, or randomly spread along bottom)
        // Let's spawn them from 3 specific incense source points at the bottom or randomly
        this.x = (Math.random() * 0.6 + 0.2) * this.canvasWidth; // Spawn in center 60% of screen width
        this.y = this.canvasHeight + Math.random() * 100;
        this.size = Math.random() * 30 + 20; // Start size
        this.maxSize = Math.random() * 120 + 80; // Grow up to
        this.vy = -(Math.random() * 0.6 + 0.3); // Rise velocity (slow)
        this.vx = (Math.random() - 0.5) * 0.4; // Small sway velocity
        this.alpha = 0;
        this.maxAlpha = Math.random() * 0.12 + 0.03; // Muted opacity for subtlety
        this.growthRate = Math.random() * 0.15 + 0.05;
        this.life = 0;
        this.maxLife = Math.random() * 600 + 400; // Long lifetime
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Growth
        if (this.size < this.maxSize) {
          this.size += this.growthRate;
        }

        // Add subtle horizontal drift based on sine wave to look like realistic smoke curls
        this.vx += Math.sin(this.y * 0.005 + this.life * 0.01) * 0.008;
        // Limit vx to prevent wild flying
        this.vx = Math.max(-0.6, Math.min(0.6, this.vx));

        this.life++;

        // Opacity fade-in then fade-out
        const lifeRatio = this.life / this.maxLife;
        if (lifeRatio < 0.2) {
          this.alpha = this.maxAlpha * (lifeRatio / 0.2); // Fade in
        } else if (lifeRatio > 0.6) {
          this.alpha = this.maxAlpha * (1 - (lifeRatio - 0.6) / 0.4); // Fade out
        } else {
          this.alpha = this.maxAlpha;
        }

        if (this.life >= this.maxLife || this.y < -this.size || this.alpha <= 0) {
          this.reset();
        }
      }

      draw() {
        if (this.alpha <= 0) return;
        ctx.beginPath();
        // Create radial gradient for fluffy, soft edge smoke
        const gradient = ctx.createRadialGradient(
          this.x, this.y, this.size * 0.1,
          this.x, this.y, this.size
        );
        // Soft gold/white smoke color
        gradient.addColorStop(0, `rgba(244, 223, 185, ${this.alpha})`);
        gradient.addColorStop(0.3, `rgba(230, 215, 190, ${this.alpha * 0.6})`);
        gradient.addColorStop(1, 'rgba(230, 215, 190, 0)');
        
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    const particleCount = 28; // Keep count reasonable for performance
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new SmokeParticle(canvas.width, canvas.height));
    }

    // Animation loop
    const animate = () => {
      // Clear with slight transparency to get trace blur
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="smoke-canvas-container">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default SmokeEffect;
